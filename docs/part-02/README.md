# Install Helm

Helm Architecture:

![Helm Architecture](https://cdn.app.compendium.com/uploads/user/e7c690e8-6ff9-102a-ac6d-e4aebca50425/5a29c3c1-7c6b-41fa-8082-bdc8a36177c9/Image/c64c01d08df64f4420e81f962fd13a23/screen_shot_2018_09_11_at_4_48_19_pm.png
"Helm Architecture")
([https://blogs.oracle.com/cloudnative/helm-kubernetes-package-management](https://blogs.oracle.com/cloudnative/helm-kubernetes-package-management))

Install [Helm](https://helm.sh/) binary:

```bash
curl -s https://raw.githubusercontent.com/helm/helm/master/scripts/get | bash
```

Install Tiller (the Helm server-side component) into the Kubernetes cluster:

```bash
kubectl create serviceaccount tiller --namespace kube-system
kubectl create clusterrolebinding tiller-cluster-rule --clusterrole=cluster-admin --serviceaccount=kube-system:tiller
helm init --wait --service-account tiller
helm repo update
```

Check if the tiller was installed properly:

```bash
kubectl get pods -l app=helm --all-namespaces
```

Output:

```shell
NAMESPACE     NAME                            READY   STATUS    RESTARTS   AGE
kube-system   tiller-deploy-69458576b-4m459   1/1     Running   0          4m
```
