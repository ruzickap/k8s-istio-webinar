#!/usr/bin/env bash

set -eu

################################################
# include the magic
################################################
test -f ./demo-magic.sh || curl --silent https://raw.githubusercontent.com/paxtonhare/demo-magic/master/demo-magic.sh > demo-magic.sh
# shellcheck disable=SC1091
. ./demo-magic.sh -n

################################################
# Configure the options
################################################

#
# speed at which to simulate typing. bigger num = faster
#
export TYPE_SPEED=60

# Uncomment to run non-interactively
export PROMPT_TIMEOUT=0

# No wait
export NO_WAIT=false

#
# custom prompt
#
# see http://www.tldp.org/HOWTO/Bash-Prompt-HOWTO/bash-prompt-escape-sequences.html for escape sequences
#
#DEMO_PROMPT="${GREEN}➜ ${CYAN}\W "
export DEMO_PROMPT="${GREEN}➜ ${CYAN}$ "

# hide the evidence
clear

### Please run these commands before running the script

# mkdir /var/tmp/test && cd /var/tmp/test
# docker run -it -rm -e USER="$USER" -v $HOME/.ssh:/root/.ssh:ro -v $PWD:/mnt ubuntu
# echo $(hostname -I) $(hostname) >> /etc/hosts
# git clone https://github.com/ruzickap/k8s-istio-webinar && cd k8s-istio-webinar

# export LETSENCRYPT_ENVIRONMENT="staging" # production
# export MY_DOMAIN="mylabs.dev"
# export EKS_CERT_MANAGER_ROUTE53_AWS_ACCESS_KEY_ID=$(awk -F\" "/AccessKeyId/ { print \$4 }" $HOME/.aws/${USER}-eks-cert-manager-route53-${MY_DOMAIN})
# export EKS_CERT_MANAGER_ROUTE53_AWS_SECRET_ACCESS_KEY=$(awk -F\" "/SecretAccessKey/ { print \$4 }" $HOME/.aws/${USER}-eks-cert-manager-route53-${MY_DOMAIN})
# eksctl utils write-kubeconfig --kubeconfig kubeconfig.conf --name=${USER}-k8s-istio-webinar
# echo -e "\n${LETSENCRYPT_ENVIRONMENT} | ${MY_DOMAIN} | ${EKS_CERT_MANAGER_ROUTE53_AWS_ACCESS_KEY_ID} | ${EKS_CERT_MANAGER_ROUTE53_AWS_SECRET_ACCESS_KEY} |\n`kubectl --kubeconfig=./kubeconfig.conf cluster-info`"

# ./run-k8s-istio-webinar.sh

if [ -z "${EKS_CERT_MANAGER_ROUTE53_AWS_ACCESS_KEY_ID+x}" ] || [ -z "${EKS_CERT_MANAGER_ROUTE53_AWS_SECRET_ACCESS_KEY+x}" ]; then
  echo "One of the mandatory variables 'EKS_CERT_MANAGER_ROUTE53_AWS_ACCESS_KEY_ID' or 'EKS_CERT_MANAGER_ROUTE53_AWS_SECRET_ACCESS_KEY' is not set !!"
  exit 1
fi

sed '/^## Prepare the local working environment/,/^Check if the new EKS cluster is available:/d' docs/part-{01..08}/README.md |
  sed -n "/^\`\`\`bash.*/,/^\`\`\`$/p;/^-----$/p" |
  sed \
    -e 's/^-----$/\np  ""\np  "################################################################################################### Press <ENTER> to continue"\nwait\n/' \
    -e 's/^```bash.*/\npe '"'"'/' \
    -e 's/^```$/'"'"'/' \
    -e '/^sleep/d' \
    > README.sh

# shellcheck disable=SC1091
source README.sh
