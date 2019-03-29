# Istio - Cleanup

![Cleanup](https://raw.githubusercontent.com/aws-samples/eks-workshop/65b766c494a5b4f5420b2912d8373c4957163541/static/images/cleanup.svg?sanitize=true
"Cleanup")

---

Remove the Bookinfo application and clean it up (delete the routing rules
and terminate the application pods):

```bash
# Clean everything - remove Bookinfo application and all Istio VirtualServices, Gateways, DestinationRules
sed -i "/read -r NAMESPACE/d" samples/bookinfo/platform/kube/cleanup.sh
samples/bookinfo/platform/kube/cleanup.sh
```

Output:

```shell
namespace ? [default] using NAMESPACE=default
destinationrule.networking.istio.io "details" deleted
destinationrule.networking.istio.io "productpage" deleted
destinationrule.networking.istio.io "ratings" deleted
destinationrule.networking.istio.io "reviews" deleted
virtualservice.networking.istio.io "bookinfo" deleted
virtualservice.networking.istio.io "details" deleted
virtualservice.networking.istio.io "productpage" deleted
virtualservice.networking.istio.io "ratings" deleted
virtualservice.networking.istio.io "reviews" deleted
gateway.networking.istio.io "bookinfo-gateway" deleted
Application cleanup may take up to one minute
service "details" deleted
deployment.extensions "details-v1" deleted
service "ratings" deleted
deployment.extensions "ratings-v1" deleted
service "reviews" deleted
deployment.extensions "reviews-v1" deleted
deployment.extensions "reviews-v2" deleted
deployment.extensions "reviews-v3" deleted
service "productpage" deleted
deployment.extensions "productpage-v1" deleted
Application cleanup successful
```

To remove Istio:

```bash
helm delete --purge istio
helm delete --purge istio-init
kubectl delete -f install/kubernetes/helm/istio-init/files
kubectl label namespace default istio-injection-
kubectl delete namespace istio-system
```

Output:

```shell
release "istio" deleted
release "istio-init" deleted
customresourcedefinition.apiextensions.k8s.io "virtualservices.networking.istio.io" deleted
...
customresourcedefinition.apiextensions.k8s.io "challenges.certmanager.k8s.io" deleted
namespace/default labeled
namespace "istio-system" deleted
```

Clean AWS

```bash
# aws route53 delete-hosted-zone --id $(aws route53 list-hosted-zones --query "HostedZones[?Name==\`${MY_DOMAIN}.\`].Id" --output text)
aws iam detach-user-policy --user-name "${USER}-eks-cert-manager-route53" --policy-arn $(aws iam list-policies --query "Policies[?PolicyName==\`${USER}-AmazonRoute53Domains-cert-manager\`].{ARN:Arn}" --output text)
aws iam delete-policy --policy-arn $(aws iam list-policies --query "Policies[?PolicyName==\`${USER}-AmazonRoute53Domains-cert-manager\`].{ARN:Arn}" --output text)
aws iam delete-access-key --user-name ${USER}-eks-cert-manager-route53 --access-key-id $(aws iam list-access-keys --user-name ${USER}-eks-cert-manager-route53 --query "AccessKeyMetadata[].AccessKeyId" --output text)
aws iam delete-user --user-name ${USER}-eks-cert-manager-route53
```

Remove EKS cluster

```bash
eksctl delete cluster --name=${USER}-k8s-istio-webinar --wait
```

Output:

```shell
[ℹ]  using region eu-central-1
[ℹ]  deleting EKS cluster "pruzicka-k8s-istio-webinar"
[ℹ]  will delete stack "eksctl-pruzicka-k8s-istio-webinar-nodegroup-ng-5be027b5"
[ℹ]  waiting for stack "eksctl-pruzicka-k8s-istio-webinar-nodegroup-ng-5be027b5" to get deleted
[ℹ]  will delete stack "eksctl-pruzicka-k8s-istio-webinar-cluster"
[ℹ]  waiting for stack "eksctl-pruzicka-k8s-istio-webinar-cluster" to get deleted
[✔]  kubeconfig has been updated
[✔]  the following EKS cluster resource(s) for "pruzicka-k8s-istio-webinar" will be deleted: cluster. If in doubt, check CloudFormation console
```

![Istio](../.vuepress/public/istio.svg "Istio")
