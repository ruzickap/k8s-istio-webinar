# Create EKS cluster

Before you start with the main content of the webinar, you need to provision
the EKS in AWS.

## Prepare the local working environment

::: tip
You can skip these steps if you have all the required software already
installed.
:::

Install necessary software:

```bash
apt update -qq
apt-get install -y -qq apt-transport-https awscli curl git gnupg jq openssh-client psmisc siege sudo unzip vim > /dev/null
```

Install `kubernetes-client` package:

```bash
if [ ! -x /usr/local/bin/kubectl ]; then
  curl --silent https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add -
  echo "deb https://apt.kubernetes.io/ kubernetes-xenial main" > /etc/apt/sources.list.d/kubernetes.list
  apt-get update -qq
  apt-get install -y -qq kubectl
fi
```

Install [Terraform](https://www.terraform.io/):

```bash
if [ ! -x /usr/local/bin/terraform ]; then
  TERRAFORM_LATEST_VERSION=$(curl -s https://checkpoint-api.hashicorp.com/v1/check/terraform | jq -r -M ".current_version")
  curl --silent --location https://releases.hashicorp.com/terraform/${TERRAFORM_LATEST_VERSION}/terraform_${TERRAFORM_LATEST_VERSION}_linux_amd64.zip --output /tmp/terraform_linux_amd64.zip
  unzip -o /tmp/terraform_linux_amd64.zip -d /usr/local/bin/
fi
```

Install [AWS IAM Authenticator for Kubernetes](https://github.com/kubernetes-sigs/aws-iam-authenticator)

```bash
if [ ! -x /usr/local/bin/aws-iam-authenticator ]; then
  sudo curl --silent -Lo /usr/local/bin/aws-iam-authenticator https://amazon-eks.s3-us-west-2.amazonaws.com/1.11.5/2018-12-06/bin/linux/amd64/aws-iam-authenticator
  sudo chmod a+x /usr/local/bin/aws-iam-authenticator
fi
```

## Create EKS

![EKS](https://raw.githubusercontent.com/aws-samples/eks-workshop/master/static/images/3-service-animated.gif
"EKS")

Authorize to AWS using AWS CLI: [https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html)

```bash
aws configure
...
```

Generate ssh keys if not exists:

```bash
test -f $HOME/.ssh/id_rsa || ( install -m 0700 -d $HOME/.ssh && ssh-keygen -b 2048 -t rsa -f $HOME/.ssh/id_rsa -q -N "" )
```

Clone this git repository:

```bash
git clone https://github.com/ruzickap/k8s-istio-webinar
cd k8s-istio-webinar
```

Configure variables for Terraform:

```bash
cat > terrafrom/aws/terraform.tfvars << EOF
# Common
prefix         = "${USER}-k8s-istio-webinar"
EOF
```

Download Terraform components:

```bash
terraform init terrafrom/aws
```

Create EKS in AWS:

```bash
terraform apply -auto-approve -var-file=terrafrom/aws/terraform.tfvars terrafrom/aws
```

Check if the new EKS cluster is avaiable:

```bash
export KUBECONFIG=$PWD/kubeconfig.conf
kubectl get nodes -o wide
```

Output:

```shell
NAME                                          STATUS   ROLES    AGE   VERSION   INTERNAL-IP   EXTERNAL-IP      OS-IMAGE         KERNEL-VERSION               CONTAINER-RUNTIME
ip-10-0-0-151.eu-central-1.compute.internal   Ready    <none>   4m    v1.11.5   10.0.0.151    54.93.241.240    Amazon Linux 2   4.14.97-90.72.amzn2.x86_64   docker://18.6.1
ip-10-0-1-151.eu-central-1.compute.internal   Ready    <none>   4m    v1.11.5   10.0.1.151    18.185.102.230   Amazon Linux 2   4.14.97-90.72.amzn2.x86_64   docker://18.6.1
```

Both worker nodes shoule be accessible via ssh:

```bash
for EXTERNAL_IP in $(kubectl get nodes --output=jsonpath='{.items[*].status.addresses[?(@.type=="ExternalIP")].address}'); do
  echo "*** ${EXTERNAL_IP}"
  ssh -q -o StrictHostKeyChecking=no -l ec2-user ${EXTERNAL_IP} uptime
done
```

Output:

```shell
*** 54.93.241.240
 08:21:57 up 5 min,  0 users,  load average: 0.03, 0.11, 0.07
*** 18.185.102.230
 08:21:57 up 5 min,  0 users,  load average: 0.04, 0.12, 0.07
```

At the end of the output you should see 2 IP addresses which
should be accessible by ssh using your public key `~/.ssh/id_rsa.pub`.
