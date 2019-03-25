# Create EKS cluster

Before you start with the main content of the webinar, you need to provision
the [Amazon EKS](https://aws.amazon.com/eks/) in AWS.

Use the domain variable:

```bash
export MY_DOMAIN="mylabs.dev"
```

## Prepare the local working environment

::: tip
You can skip these steps if you have all the required software already
installed.
:::

Install necessary software:

```bash
apt update -qq
DEBIAN_FRONTEND=noninteractive apt-get install -y -qq awscli curl git openssh-client siege sudo > /dev/null
```

Install `kubernetes-client` package:

```bash
if [ ! -x /usr/local/bin/kubectl ]; then
  sudo curl -s -Lo /usr/local/bin/kubectl https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl
  sudo chmod a+x /usr/local/bin/kubectl
fi
```

Install [eksctl](https://eksctl.io/):

```bash
if [ ! -x /usr/local/bin/eksctl ]; then
  curl -s -L "https://github.com/weaveworks/eksctl/releases/download/latest_release/eksctl_Linux_amd64.tar.gz" | sudo tar xz -C /usr/local/bin/
fi
```

Install [AWS IAM Authenticator for Kubernetes](https://github.com/kubernetes-sigs/aws-iam-authenticator):

```bash
if [ ! -x /usr/local/bin/aws-iam-authenticator ]; then
  sudo curl -s -Lo /usr/local/bin/aws-iam-authenticator https://amazon-eks.s3-us-west-2.amazonaws.com/1.11.5/2018-12-06/bin/linux/amd64/aws-iam-authenticator
  sudo chmod a+x /usr/local/bin/aws-iam-authenticator
fi
```

## Configure AWS

Authorize to AWS using AWS CLI: [https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html)

```bash
aws configure
...
```

Create DNS zone:

```bash
aws route53 create-hosted-zone --name ${MY_DOMAIN} --caller-reference ${MY_DOMAIN}
```

Use your domain registrar to change the nameservers for your zone (mylabs.dev)
to use Amazon Route 53 nameservers. Here are the Route 53 nameservers you
should use:

```bash
aws route53 get-hosted-zone \
  --id $(aws route53 list-hosted-zones --query "HostedZones[?Name=='${MY_DOMAIN}.'].Id" --output text) \
  --query 'DelegationSet.NameServers'
```

Create policy allowing the cert-manager to change Route 53 settings:

```bash
cat > /tmp/${USER}-route_53_change_policy.json << EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "route53:GetChange",
            "Resource": "arn:aws:route53:::change/*"
        },
        {
            "Effect": "Allow",
            "Action": "route53:ChangeResourceRecordSets",
            "Resource": "arn:aws:route53:::hostedzone/*"
        },
        {
            "Effect": "Allow",
            "Action": "route53:ListHostedZonesByName",
            "Resource": "*"
        }
    ]
}
EOF

aws iam create-policy \
  --policy-name ${USER}-AmazonRoute53Domains-cert-manager \
  --description "Policy required by cert-manager to be able to modify Route 53 when generating wildcard certificates using Let's Encrypt" \
  --policy-document file:///tmp/${USER}-route_53_change_policy.json
```

Create user which will use the policy above allowing the cert-manager to change
Route 53 settings:

```bash
aws iam create-user --user-name ${USER}-eks-cert-manager-route53
POLICY_ARN=$(aws iam list-policies --query "Policies[?PolicyName=='${USER}-AmazonRoute53Domains-cert-manager'].{ARN:Arn}" --output text)
aws iam attach-user-policy --user-name "${USER}-eks-cert-manager-route53" --policy-arn $POLICY_ARN
aws iam create-access-key --user-name ${USER}-eks-cert-manager-route53
...
        "AccessKeyId": "AXXXXXXXXXXXXXXXXXXQ",
        "SecretAccessKey": "IXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXd",
...
```

Write down the `AccessKeyId` and `SecretAccessKey` you will need it later to use
it in `ClusterIssuer` definition for `cert-manager`.

## Create Amazon EKS

![EKS](https://raw.githubusercontent.com/aws-samples/eks-workshop/master/static/images/3-service-animated.gif
"EKS")

Generate ssh keys if not exists:

```bash
test -f $HOME/.ssh/id_rsa || ( install -m 0700 -d $HOME/.ssh && ssh-keygen -b 2048 -t rsa -f $HOME/.ssh/id_rsa -q -N "" )
```

Clone this git repository:

```bash
git clone https://github.com/ruzickap/k8s-istio-webinar
cd k8s-istio-webinar
```

Create [Amazon EKS](https://aws.amazon.com/eks/) in AWS:

```bash
eksctl create cluster \
--name=${USER}-k8s-istio-webinar \
--tags "Application=Istio Webinar,Owner=${USER},Environment=Webinar,Division=Services" \
--region=eu-central-1 \
--node-type=t3.medium \
--ssh-access \
--node-ami=auto \
--node-labels "Application=Istio_Webinar,Owner=${USER},Environment=Webinar,Division=Services" \
--kubeconfig=kubeconfig.conf \
--verbose 4
```

Check if the new EKS cluster is available:

```bash
export KUBECONFIG=$PWD/kubeconfig.conf
kubectl get nodes -o wide
```

Output:

```shell
NAME                                          STATUS   ROLES    AGE   VERSION   INTERNAL-IP   EXTERNAL-IP      OS-IMAGE         KERNEL-VERSION               CONTAINER-RUNTIME
NAME                                              STATUS   ROLES    AGE   VERSION   INTERNAL-IP      EXTERNAL-IP      OS-IMAGE         KERNEL-VERSION               CONTAINER-RUNTIME
ip-192-168-11-227.eu-central-1.compute.internal   Ready    <none>   3m    v1.11.5   192.168.11.227   18.194.185.132   Amazon Linux 2   4.14.97-90.72.amzn2.x86_64   docker://18.6.1
ip-192-168-42-115.eu-central-1.compute.internal   Ready    <none>   3m    v1.11.5   192.168.42.115   18.195.182.75    Amazon Linux 2   4.14.97-90.72.amzn2.x86_64   docker://18.6.1
```

Both worker nodes should be accessible via ssh:

```bash
for EXTERNAL_IP in $(kubectl get nodes --output=jsonpath='{.items[*].status.addresses[?(@.type=="ExternalIP")].address}'); do
  echo "*** ${EXTERNAL_IP}"
  ssh -q -o StrictHostKeyChecking=no -l ec2-user ${EXTERNAL_IP} uptime
done
```

Output:

```shell
*** 18.194.185.132
 16:35:21 up 3 min,  0 users,  load average: 0.39, 0.37, 0.19
*** 18.195.182.75
 16:35:22 up 3 min,  0 users,  load average: 0.16, 0.32, 0.17
 ```

At the end of the output you should see 2 IP addresses which
should be accessible by ssh using your public key `~/.ssh/id_rsa.pub`.
