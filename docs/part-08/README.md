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

To remove Istio:

```bash
helm delete --purge istio
helm delete --purge istio-init
kubectl delete -f install/kubernetes/helm/istio-init/files
kubectl label namespace default istio-injection-
kubectl delete namespace istio-system
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

![Istio](../.vuepress/public/istio.svg "Istio")
