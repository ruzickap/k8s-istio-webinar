#!/bin/bash -eux

kubeadm-dind-cluster_install() {
  curl -Ls https://github.com/kubernetes-sigs/kubeadm-dind-cluster/releases/download/v0.1.0/dind-cluster-v1.13.sh --output dind-cluster.sh
  chmod +x dind-cluster.sh

  # start the cluster
  ./dind-cluster.sh up

  # add kubectl directory to PATH
  export PATH="$HOME/.kubeadm-dind-cluster:$PATH"
}

sudo swapoff -a

# Find out latest kubernetes version
export KUBERNETES_VERSION=$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)

# Download kubectl, which is a requirement for using minikube.
curl -sLo kubectl https://storage.googleapis.com/kubernetes-release/release/${KUBERNETES_VERSION}/bin/linux/amd64/kubectl
chmod +x kubectl
sudo mv kubectl /usr/local/bin/

# Start kubernetes
kubeadm-dind-cluster_install
kubectl cluster-info

# Commands
sed -n '/^```bash$/,/^```$/p' docs/part-{02..03}/README.md | sed '/^```*/d' > README.sh
source ./README.sh

# Istio cleanup
helm delete --purge istio
helm delete --purge istio-init
kubectl delete namespace istio-system
kubectl delete -f install/kubernetes/helm/istio-init/files
kubectl label namespace default istio-injection-

cd ../..
rm -rf tmp
