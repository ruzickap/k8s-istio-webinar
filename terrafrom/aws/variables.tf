variable "prefix" {
  description = "Prefix used for all names"
  default     = "k8s-istio-webinar"
}

variable "aws_autoscaling_group_worker_nodes" {
  description = "Number of VMs which should be created as k8s worker nodes"
  default     = 2
}

variable "aws_worker_nodes_instance_type" {
  description = "Instance type for k8s worker nodes"
  default     = "t3.medium"
}

variable "aws_autoscaling_group_worker_nodes_max" {
  description = "Max number of VMs which can be started as k8s worker nodes in autoscaling group"
  default     = 3
}

variable "aws_autoscaling_group_worker_nodes_min" {
  description = "Min number of VMs which should be kept as k8s worker nodes in autoscaling group"
  default     = 1
}

variable "aws_vpc_cidr_block" {
  description = "AWS VPC CIDR block"
  default     = "10.0.0.0/16"
}

variable "aws_subnet_count" {
  description = "Number of AWS subnets created in different AZ"
  default     = 2
}

variable "aws_tags" {
  description = "Tags for all objects"
  type        = "map"
  default     = {
    "Application" = "Istio Webinar",
    "Consumer"    = "pruzicka@mirantis.com",
    "Division"    = "Services",
    "Environment" = "Webinar"
  }
}

variable "aws_key_pair" {
  description = "SSH Public key location"
  default = "~/.ssh/id_rsa.pub"
}

variable "aws_region" {
  description = "AWS region"
  default = "eu-central-1"
}
