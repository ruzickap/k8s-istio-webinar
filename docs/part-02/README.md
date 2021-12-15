# Install Helm

Install [Helm](https://helm.sh/) binary:

```bash
curl -s https://raw.githubusercontent.com/helm/helm/master/scripts/get | bash
```

Output:

```shell
Downloading https://kubernetes-helm.storage.googleapis.com/helm-v2.13.1-linux-amd64.tar.gz
Preparing to install helm and tiller into /usr/local/bin
helm installed into /usr/local/bin/helm
tiller installed into /usr/local/bin/tiller
Run 'helm init' to configure helm.
```

Install Tiller (the Helm server-side component) into the Kubernetes cluster:

```bash
kubectl create serviceaccount tiller --namespace kube-system
kubectl create clusterrolebinding tiller-cluster-rule --clusterrole=cluster-admin --serviceaccount=kube-system:tiller
helm init --wait --service-account tiller
helm repo update
```

Output:

```shell
serviceaccount/tiller created
clusterrolebinding.rbac.authorization.k8s.io/tiller-cluster-rule created
Creating /root/.helm
Creating /root/.helm/repository
Creating /root/.helm/repository/cache
Creating /root/.helm/repository/local
Creating /root/.helm/plugins
Creating /root/.helm/starters
Creating /root/.helm/cache/archive
Creating /root/.helm/repository/repositories.yaml
Adding stable repo with URL: https://kubernetes-charts.storage.googleapis.com
Adding local repo with URL: http://127.0.0.1:8879/charts
$HELM_HOME has been configured at /root/.helm.

Tiller (the Helm server-side component) has been installed into your Kubernetes Cluster.

Please note: by default, Tiller is deployed with an insecure 'allow unauthenticated users' policy.
To prevent this, run `helm init` with the --tiller-tls-verify flag.
For more information on securing your installation see: https://docs.helm.sh/using_helm/#securing-your-helm-installation
Happy Helming!
Hang tight while we grab the latest from your chart repositories...
...Skip local chart repository
...Successfully got an update from the "stable" chart repository
Update Complete. ⎈ Happy Helming!⎈
```

Check if the tiller was installed properly:

```bash
kubectl get pods -l app=helm -n kube-system
```

Output:

```shell
NAMESPACE     NAME                             READY   STATUS    RESTARTS   AGE
kube-system   tiller-deploy-54fc6d9ccc-48n4w   1/1     Running   0          19s
```
