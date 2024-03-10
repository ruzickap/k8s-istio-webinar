#!/bin/bash -eux

kubeadm-dind-cluster_install() {
  curl -Ls https://github.com/kubernetes-sigs/kubeadm-dind-cluster/releases/download/v0.1.0/dind-cluster-v1.13.sh --output dind-cluster.sh

  chmod +x dind-cluster.sh

  # start the cluster
  NUM_NODES=2 SKIP_DASHBOARD="true" SKIP_SNAPSHOT="true" ./dind-cluster.sh up

  # add kubectl directory to PATH
  export PATH="$HOME/.kubeadm-dind-cluster:$PATH"
}

sudo swapoff -a

# Find out latest kubernetes version
KUBERNETES_VERSION=$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)
export KUBERNETES_VERSION

# Download kubectl, which is a requirement for using minikube.
curl -sLo kubectl "https://storage.googleapis.com/kubernetes-release/release/${KUBERNETES_VERSION}/bin/linux/amd64/kubectl"
chmod +x kubectl
sudo mv kubectl /usr/local/bin/

# Start kubernetes
kubeadm-dind-cluster_install
kubectl cluster-info

# Variables
export LETSENCRYPT_ENVIRONMENT="staging" # production
export MY_DOMAIN="mylabs.dev"

# Commands
sed -n "/^\`\`\`bash$/,/^\`\`\`$/p" docs/part-{02..08}/README.md | sed "/^\`\`\`*/d" > README.sh
# shellcheck disable=SC1091,SC1094
source ./README.sh

# Istio + app cleanup
NAMESPACE=default samples/bookinfo/platform/kube/cleanup.sh
helm delete --purge istio
helm delete --purge istio-init
kubectl delete -f install/kubernetes/helm/istio-init/files
kubectl delete namespace istio-system
kubectl label namespace default istio-injection-

cd ../..
rm -rf tmp
