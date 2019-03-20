# https://learn.hashicorp.com/terraform/aws/eks-intro

provider "aws" {
  region = "${var.aws_region}"
}

# Base VPC Networking

data "aws_availability_zones" "available" {}

resource "aws_vpc" "vpc" {
  cidr_block = "${var.aws_vpc_cidr_block}"

  tags = "${merge
    (
      map(
        "Name", "${var.prefix}-vpc",
        "kubernetes.io/cluster/${var.prefix}-eks_cluster", "shared",
      ),
      var.aws_tags
    )
  }"
}

resource "aws_subnet" "subnet" {
  count = "${var.aws_subnet_count}"

  availability_zone = "${data.aws_availability_zones.available.names[count.index]}"
  cidr_block        = "${cidrsubnet(var.aws_vpc_cidr_block, 8, count.index)}"
  vpc_id            = "${aws_vpc.vpc.id}"

  tags = "${merge
    (
      map(
        "Name", "${var.prefix}-subnet",
        "kubernetes.io/cluster/${var.prefix}-eks_cluster", "shared",
      ),
      var.aws_tags
    )
  }"
}

resource "aws_internet_gateway" "internet_gateway" {
  vpc_id = "${aws_vpc.vpc.id}"

tags = "${merge
    (
      map(
        "Name", "${var.prefix}-internet_gateway"
      ),
      var.aws_tags
    )
  }"
}

resource "aws_route_table" "route_table" {
  vpc_id = "${aws_vpc.vpc.id}"

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = "${aws_internet_gateway.internet_gateway.id}"
  }

  tags = "${merge
    (
      map(
        "Name", "${var.prefix}-route_table"
      ),
      var.aws_tags
    )
  }"
}

resource "aws_route_table_association" "route_table_association" {
  count = "${var.aws_subnet_count}"

  subnet_id      = "${aws_subnet.subnet.*.id[count.index]}"
  route_table_id = "${aws_route_table.route_table.id}"
}

# EKS Master Cluster IAM Role

resource "aws_iam_role" "iam_role-cluster" {
  name               = "${var.prefix}-iam_role-cluster"
  description        = "IAM role and policy to allow the EKS service to manage or retrieve data from other AWS services"
  assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "eks.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
POLICY

  tags = "${merge
    (
      map(
        "Name", "${var.prefix}-iam_role-cluster"
      ),
      var.aws_tags
    )
  }"
}

resource "aws_iam_role_policy_attachment" "iam_role_policy_attachment-AmazonEKSClusterPolicy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
  role       = "${aws_iam_role.iam_role-cluster.name}"
}

resource "aws_iam_role_policy_attachment" "iam_role_policy_attachment-AmazonEKSServicePolicy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSServicePolicy"
  role       = "${aws_iam_role.iam_role-cluster.name}"
}

# EKS Master Cluster Security Group

resource "aws_security_group" "security_group-master" {
  name        = "${var.prefix}-security_group-master"
  description = "Cluster communication with worker nodes"
  vpc_id      = "${aws_vpc.vpc.id}"

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = "${merge
      (
        map(
          "Name", "${var.prefix}-security_group-master"
        ),
        var.aws_tags
      )
    }"
}

resource "aws_security_group_rule" "security_group_rule" {
  cidr_blocks       = ["0.0.0.0/0"]
  description       = "Allow workstation to communicate with the cluster API Server"
  from_port         = 443
  to_port           = 443
  protocol          = "tcp"
  security_group_id = "${aws_security_group.security_group-master.id}"
  type              = "ingress"
}

# EKS Master Cluster

resource "aws_eks_cluster" "eks_cluster" {
  name            = "${var.prefix}-eks_cluster"
  role_arn        = "${aws_iam_role.iam_role-cluster.arn}"

  vpc_config {
    security_group_ids = ["${aws_security_group.security_group-master.id}"]
    subnet_ids         = ["${aws_subnet.subnet.*.id}"]
  }

  depends_on = [
    "aws_iam_role_policy_attachment.iam_role_policy_attachment-AmazonEKSClusterPolicy",
    "aws_iam_role_policy_attachment.iam_role_policy_attachment-AmazonEKSServicePolicy",
  ]
}

# Configuring kubectl for EKS

locals {
  kubeconfig = <<KUBECONFIG
apiVersion: v1
clusters:
- cluster:
    server: ${aws_eks_cluster.eks_cluster.endpoint}
    certificate-authority-data: ${aws_eks_cluster.eks_cluster.certificate_authority.0.data}
  name: kubernetes
contexts:
- context:
    cluster: kubernetes
    user: aws
  name: aws
current-context: aws
kind: Config
preferences: {}
users:
- name: aws
  user:
    exec:
      apiVersion: client.authentication.k8s.io/v1alpha1
      command: aws-iam-authenticator
      args:
        - "token"
        - "-i"
        - "${var.prefix}-eks_cluster"
KUBECONFIG
}

resource "local_file" "kubeconfig" {
  content  = "${local.kubeconfig}"
  filename = "kubeconfig.conf"
}

#########################
# Kubernetes Worker Nodes
#########################

resource "aws_key_pair" "key_pair" {
  key_name   = "${var.prefix}-key_pair"
  public_key = "${file(var.aws_key_pair)}"
}

# Worker Node IAM Role and Instance Profile

resource "aws_iam_role" "iam_role-node" {
  name               = "${var.prefix}-iam_role-node"
  description        = "IAM role and policy to allow the worker nodes to manage or retrieve data from other AWS services"
  assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
POLICY

  tags = "${merge
    (
      map(
        "Name", "${var.prefix}-iam_role-node"
      ),
      var.aws_tags
    )
  }"
}

resource "aws_iam_role_policy_attachment" "iam_role_policy_attachment-AmazonEKSWorkerNodePolicy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy"
  role       = "${aws_iam_role.iam_role-node.name}"
}

resource "aws_iam_role_policy_attachment" "iam_role_policy_attachment-AmazonEKS_CNI_Policy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy"
  role       = "${aws_iam_role.iam_role-node.name}"
}

resource "aws_iam_role_policy_attachment" "iam_role_policy_attachment-AmazonEC2ContainerRegistryReadOnly" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
  role       = "${aws_iam_role.iam_role-node.name}"
}

resource "aws_iam_instance_profile" "iam_instance_profile" {
  name = "${var.prefix}-iam_instance_profile"
  role = "${aws_iam_role.iam_role-node.name}"
}

# Worker Node Security Group

resource "aws_security_group" "security_group-node" {
  name        = "${var.prefix}-security_group-node"
  description = "Security group for all nodes in the cluster"
  vpc_id      = "${aws_vpc.vpc.id}"

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = "${merge
    (
      map(
        "Name", "${var.prefix}-security_group-node",
        "kubernetes.io/cluster/${var.prefix}-eks_cluster", "owned",
      ),
      var.aws_tags
    )
  }"
}

resource "aws_security_group_rule" "aws_security_group_rule-node" {
  description              = "Allow node to communicanodete with each other"
  from_port                = 0
  protocol                 = "-1"
  security_group_id        = "${aws_security_group.security_group-node.id}"
  source_security_group_id = "${aws_security_group.security_group-node.id}"
  to_port                  = 65535
  type                     = "ingress"
}

resource "aws_security_group_rule" "aws_security_group_rule-cluster" {
  description              = "Allow worker Kubelets and pods to receive communication from the cluster control plane"
  from_port                = 1025
  protocol                 = "tcp"
  security_group_id        = "${aws_security_group.security_group-node.id}"
  source_security_group_id = "${aws_security_group.security_group-master.id}"
  to_port                  = 65535
  type                     = "ingress"
}

resource "aws_security_group_rule" "aws_security_group_rule-cluster-ssh" {
  description              = "Allow node workers to be accessed by ssh"
  from_port                = 22
  protocol                 = "tcp"
  security_group_id        = "${aws_security_group.security_group-node.id}"
  cidr_blocks              = [ "0.0.0.0/0" ]
  to_port                  = 22
  type                     = "ingress"
}

# Worker Node Access to EKS Master Cluster

resource "aws_security_group_rule" "aws_security_group_rule-node-https" {
  description              = "Allow pods to communicate with the cluster API Server"
  from_port                = 443
  protocol                 = "tcp"
  security_group_id        = "${aws_security_group.security_group-master.id}"
  source_security_group_id = "${aws_security_group.security_group-node.id}"
  to_port                  = 443
  type                     = "ingress"
}

#  Worker Node AutoScaling Group

data "aws_ami" "ami" {
  filter {
    name   = "name"
    values = ["amazon-eks-node-${aws_eks_cluster.eks_cluster.version}-v*"]
  }

  most_recent = true
  owners      = ["602401143452"] # Amazon EKS AMI Account ID
}

locals {
  node-userdata = <<USERDATA
#!/bin/bash
set -o xtrace
/etc/eks/bootstrap.sh --apiserver-endpoint '${aws_eks_cluster.eks_cluster.endpoint}' --b64-cluster-ca '${aws_eks_cluster.eks_cluster.certificate_authority.0.data}' '${var.prefix}-eks_cluster'
USERDATA
}

resource "aws_launch_configuration" "launch_configuration" {
  associate_public_ip_address = true
  iam_instance_profile        = "${aws_iam_instance_profile.iam_instance_profile.name}"
  image_id                    = "${data.aws_ami.ami.id}"
  instance_type               = "${var.aws_worker_nodes_instance_type}"
  name_prefix                 = "${var.prefix}-launch_configuration"
  security_groups             = ["${aws_security_group.security_group-node.id}"]
  key_name                    = "${aws_key_pair.key_pair.key_name}"
  user_data_base64            = "${base64encode(local.node-userdata)}"

  lifecycle {
    create_before_destroy = true
  }
}

# Tag workaround to use "propagate_at_launch" for all tags
data "null_data_source" "autoscaling_group-tags" {
  count = "${length(keys(var.aws_tags))}"

  inputs = {
    key                 = "${element(keys(var.aws_tags), count.index)}"
    value               = "${element(values(var.aws_tags), count.index)}"
    propagate_at_launch = true
  }
}

resource "aws_autoscaling_group" "autoscaling_group" {
  desired_capacity     = "${var.aws_autoscaling_group_worker_nodes}"
  launch_configuration = "${aws_launch_configuration.launch_configuration.id}"
  max_size             = "${var.aws_autoscaling_group_worker_nodes_max}"
  min_size             = "${var.aws_autoscaling_group_worker_nodes_min}"
  name                 = "${var.prefix}-autoscaling_group"
  vpc_zone_identifier  = ["${aws_subnet.subnet.*.id}"]

  tags = [
    {
      key                 = "Name"
      value               = "${var.prefix}"
      propagate_at_launch = true
    },
    {
      key                 = "kubernetes.io/cluster/${var.prefix}-eks_cluster"
      value               = "owned"
      propagate_at_launch = true
    },
    "${data.null_data_source.autoscaling_group-tags.*.outputs}"
  ]
}

# Required Kubernetes Configuration to Join Worker Nodes

locals {
  config_map_aws_auth = <<CONFIGMAPAWSAUTH
apiVersion: v1
kind: ConfigMap
metadata:
  name: aws-auth
  namespace: kube-system
data:
  mapRoles: |
    - rolearn: ${aws_iam_role.iam_role-node.arn}
      username: system:node:{{EC2PrivateDNSName}}
      groups:
        - system:bootstrappers
        - system:nodes
CONFIGMAPAWSAUTH
}

resource "local_file" "local_file-config_map_aws_auth" {
  content  = "${local.config_map_aws_auth}"
  filename = "/tmp/config-map-aws-auth_${var.prefix}-eks_cluster.yaml"
}

resource "null_resource" "update_config_map_aws_auth" {
  depends_on = [
    "aws_eks_cluster.eks_cluster",
    "local_file.kubeconfig",
  ]

  provisioner "local-exec" {
    command = <<EOF
kubectl apply -f /tmp/config-map-aws-auth_${var.prefix}-eks_cluster.yaml --kubeconfig kubeconfig.conf
EOF
  }
}
