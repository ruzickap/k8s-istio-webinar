#!/usr/bin/env bash

################################################
# include the magic
################################################
test -f ./demo-magic.sh || curl --silent https://raw.githubusercontent.com/paxtonhare/demo-magic/master/demo-magic.sh > demo-magic.sh
. ./demo-magic.sh -n

################################################
# Configure the options
################################################

#
# speed at which to simulate typing. bigger num = faster
#
TYPE_SPEED=60

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
DEMO_PROMPT="${GREEN}➜ ${CYAN}$ "

# hide the evidence
clear

### Please run these commands before running the script

# mkdir /var/tmp/test && cd /var/tmp/test
# docker run -it -rm -e USER="$USER" -v /home/$USER/.ssh:/root/.ssh:ro -v $PWD:/mnt ubuntu

# export LETSENCRYPT_ENVIRONMENT="staging"
# export MY_DOMAIN="mylabs.dev"
# export EKS_CERT_MANAGER_ROUTE53_AWS_ACCESS_KEY_ID=$(awk -F\" '/AccessKeyId/ { print $4 }' $HOME/.aws/${USER}-eks-cert-manager-route53)
# export EKS_CERT_MANAGER_ROUTE53_AWS_SECRET_ACCESS_KEY=$(awk -F\" '/SecretAccessKey/ { print $4 }' $HOME/.aws/${USER}-eks-cert-manager-route53)

# apt-get update -qq && apt-get install -qq -y curl git pv > /dev/null
# git clone https://github.com/ruzickap/k8s-istio-webinar && cd k8s-istio-webinar
# ./run-k8s-istio-webinar.sh

sed '/^## Prepare the local working environment/,/^Check if the new EKS cluster is available:/d' docs/part-{01..09}/README.md | \
sed -n '/^```bash$/,/^```$/p;/^-----$/p'  | \
sed -e 's/^-----$/\
p  ""\
p  "################################################################################################### Press <ENTER> to continue"\
wait\
/' \
-e 's/^```bash$/\
pe '"'"'/' \
-e 's/^```$/'"'"'/' \
-e '/^sleep/d' \
> README.sh

source README.sh
