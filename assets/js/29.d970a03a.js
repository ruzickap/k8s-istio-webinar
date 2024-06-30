(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{342:function(a,s,t){"use strict";t.r(s);var e=t(8),n=Object(e.a)({},(function(){var a=this,s=a._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h1",{attrs:{id:"create-eks-cluster"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#create-eks-cluster"}},[a._v("#")]),a._v(" Create EKS cluster")]),a._v(" "),s("p",[a._v("Before you start with the main content of the webinar, you need to provision\nthe "),s("a",{attrs:{href:"https://aws.amazon.com/eks/",target:"_blank",rel:"noopener noreferrer"}},[a._v("Amazon EKS"),s("OutboundLink")],1),a._v(" in AWS.")]),a._v(" "),s("p",[a._v("Use the "),s("code",[a._v("MY_DOMAIN")]),a._v(" variable containing domain and "),s("code",[a._v("LETSENCRYPT_ENVIRONMENT")]),a._v("\nvariable.\nThe "),s("code",[a._v("LETSENCRYPT_ENVIRONMENT")]),a._v(" variable should be one of:")]),a._v(" "),s("ul",[s("li",[s("p",[s("code",[a._v("staging")]),a._v(" - Let’s Encrypt will create testing certificate (not valid)")])]),a._v(" "),s("li",[s("p",[s("code",[a._v("production")]),a._v(" - Let’s Encrypt will create valid certificate (use with care)")])])]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("export")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("MY_DOMAIN")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token variable"}},[a._v("${MY_DOMAIN"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":-")]),a._v("mylabs.dev}")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("export")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("LETSENCRYPT_ENVIRONMENT")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token variable"}},[a._v("${LETSENCRYPT_ENVIRONMENT"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":-")]),a._v("staging}")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("echo")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"'),s("span",{pre:!0,attrs:{class:"token variable"}},[a._v("${MY_DOMAIN}")]),a._v(" | "),s("span",{pre:!0,attrs:{class:"token variable"}},[a._v("${LETSENCRYPT_ENVIRONMENT}")]),a._v('"')]),a._v("\n")])])]),s("h2",{attrs:{id:"prepare-the-local-working-environment"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#prepare-the-local-working-environment"}},[a._v("#")]),a._v(" Prepare the local working environment")]),a._v(" "),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[a._v("TIP")]),a._v(" "),s("p",[a._v("You can skip these steps if you have all the required software already\ninstalled.")])]),a._v(" "),s("p",[a._v("Install necessary software:")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("test")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-x")]),a._v(" /usr/bin/apt "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("&&")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("apt")]),a._v(" update "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-qq")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("&&")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("DEBIAN_FRONTEND")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("noninteractive "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("apt-get")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("install")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-y")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-qq")]),a._v(" awscli "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" gettext-base "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("git")]),a._v(" openssh-client siege "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v(" /dev/null\n")])])]),s("p",[a._v("Install "),s("a",{attrs:{href:"https://github.com/kubernetes/kubectl",target:"_blank",rel:"noopener noreferrer"}},[a._v("kubectl"),s("OutboundLink")],1),a._v(" binary:")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("if")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("!")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-x")]),a._v(" /usr/local/bin/kubectl "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("then")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-s")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-Lo")]),a._v(" /usr/local/bin/kubectl https://storage.googleapis.com/kubernetes-release/release/"),s("span",{pre:!0,attrs:{class:"token variable"}},[s("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$(")]),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-s")]),a._v(" https://storage.googleapis.com/kubernetes-release/release/stable.txt"),s("span",{pre:!0,attrs:{class:"token variable"}},[a._v(")")])]),a._v("/bin/linux/amd64/kubectl\n  "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("chmod")]),a._v(" a+x /usr/local/bin/kubectl\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("fi")]),a._v("\n")])])]),s("p",[a._v("Install "),s("a",{attrs:{href:"https://eksctl.io/",target:"_blank",rel:"noopener noreferrer"}},[a._v("eksctl"),s("OutboundLink")],1),a._v(":")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("if")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("!")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-x")]),a._v(" /usr/local/bin/eksctl "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("then")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-s")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-L")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"https://github.com/weaveworks/eksctl/releases/download/latest_release/eksctl_Linux_amd64.tar.gz"')]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("|")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("tar")]),a._v(" xz "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-C")]),a._v(" /usr/local/bin/\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("fi")]),a._v("\n")])])]),s("p",[a._v("Install "),s("a",{attrs:{href:"https://github.com/kubernetes-sigs/aws-iam-authenticator",target:"_blank",rel:"noopener noreferrer"}},[a._v("AWS IAM Authenticator for Kubernetes"),s("OutboundLink")],1),a._v(":")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("if")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("!")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-x")]),a._v(" /usr/local/bin/aws-iam-authenticator "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("then")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-s")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-Lo")]),a._v(" /usr/local/bin/aws-iam-authenticator https://amazon-eks.s3-us-west-2.amazonaws.com/1.11.5/2018-12-06/bin/linux/amd64/aws-iam-authenticator\n  "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("chmod")]),a._v(" a+x /usr/local/bin/aws-iam-authenticator\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("fi")]),a._v("\n")])])]),s("h2",{attrs:{id:"configure-aws"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#configure-aws"}},[a._v("#")]),a._v(" Configure AWS")]),a._v(" "),s("p",[a._v("Authorize to AWS using AWS CLI: "),s("a",{attrs:{href:"https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html",target:"_blank",rel:"noopener noreferrer"}},[a._v("Configuring the AWS CLI"),s("OutboundLink")],1)]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("aws configure\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("..")]),a._v(".\n")])])]),s("p",[a._v("Create DNS zone:")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("aws route53 create-hosted-zone "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--name")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token variable"}},[a._v("${MY_DOMAIN}")]),a._v(" --caller-reference "),s("span",{pre:!0,attrs:{class:"token variable"}},[a._v("${MY_DOMAIN}")]),a._v("\n")])])]),s("p",[a._v("Use your domain registrar to change the nameservers for your zone (for example\n"),s("code",[a._v("mylabs.dev")]),a._v(") to use the Amazon Route 53 nameservers. Here is the way how you\ncan find out the the Route 53 nameservers:")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("aws route53 get-hosted-zone "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--id")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token variable"}},[s("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$(")]),a._v("aws route53 list-hosted-zones "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--query")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"HostedZones[?Name==\\'),s("span",{pre:!0,attrs:{class:"token variable"}},[s("span",{pre:!0,attrs:{class:"token variable"}},[a._v("`")]),a._v("$"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("MY_DOMAIN"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("."),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),s("span",{pre:!0,attrs:{class:"token variable"}},[a._v("`")])]),a._v('].Id"')]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--output")]),a._v(" text"),s("span",{pre:!0,attrs:{class:"token variable"}},[a._v(")")])]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--query")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"DelegationSet.NameServers"')]),a._v("\n")])])]),s("p",[a._v("Create policy allowing the cert-manager to change Route 53 settings. This will\nallow cert-manager to generate wildcard SSL certificates by Let's Encrypt\ncertificate authority.")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("aws iam create-policy "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n  --policy-name "),s("span",{pre:!0,attrs:{class:"token variable"}},[a._v("${"),s("span",{pre:!0,attrs:{class:"token environment constant"}},[a._v("USER")]),a._v("}")]),a._v("-AmazonRoute53Domains-cert-manager "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--description")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"Policy required by cert-manager to be able to modify Route 53 when generating wildcard certificates using Lets Encrypt"')]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n  --policy-document file://files/route_53_change_policy.json\n")])])]),s("p",[a._v("Create user which will use the policy above allowing the cert-manager to change\nRoute 53 settings:")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("aws iam create-user --user-name "),s("span",{pre:!0,attrs:{class:"token variable"}},[a._v("${"),s("span",{pre:!0,attrs:{class:"token environment constant"}},[a._v("USER")]),a._v("}")]),a._v("-eks-cert-manager-route53\n"),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("POLICY_ARN")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token variable"}},[s("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$(")]),a._v("aws iam list-policies "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--query")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"Policies[?PolicyName==\\'),s("span",{pre:!0,attrs:{class:"token variable"}},[s("span",{pre:!0,attrs:{class:"token variable"}},[a._v("`")]),a._v("$"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),s("span",{pre:!0,attrs:{class:"token environment constant"}},[a._v("USER")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("-AmazonRoute53Domains-cert-manager"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),s("span",{pre:!0,attrs:{class:"token variable"}},[a._v("`")])]),a._v('].{ARN:Arn}"')]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--output")]),a._v(" text"),s("span",{pre:!0,attrs:{class:"token variable"}},[a._v(")")])]),a._v("\naws iam attach-user-policy --user-name "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"'),s("span",{pre:!0,attrs:{class:"token variable"}},[a._v("${"),s("span",{pre:!0,attrs:{class:"token environment constant"}},[a._v("USER")]),a._v("}")]),a._v('-eks-cert-manager-route53"')]),a._v(" --policy-arn "),s("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$POLICY_ARN")]),a._v("\naws iam create-access-key --user-name "),s("span",{pre:!0,attrs:{class:"token variable"}},[a._v("${"),s("span",{pre:!0,attrs:{class:"token environment constant"}},[a._v("USER")]),a._v("}")]),a._v("-eks-cert-manager-route53 "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token environment constant"}},[a._v("$HOME")]),a._v("/.aws/"),s("span",{pre:!0,attrs:{class:"token variable"}},[a._v("${"),s("span",{pre:!0,attrs:{class:"token environment constant"}},[a._v("USER")]),a._v("}")]),a._v("-eks-cert-manager-route53-"),s("span",{pre:!0,attrs:{class:"token variable"}},[a._v("${MY_DOMAIN}")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("export")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("EKS_CERT_MANAGER_ROUTE53_AWS_ACCESS_KEY_ID")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token variable"}},[s("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$(")]),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("awk")]),a._v(" -F"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v('" '),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"/AccessKeyId/ { print \\'),s("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$4")]),a._v(' }"')]),a._v(" "),s("span",{pre:!0,attrs:{class:"token environment constant"}},[a._v("$HOME")]),a._v("/.aws/$"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),s("span",{pre:!0,attrs:{class:"token environment constant"}},[a._v("USER")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("-eks-cert-manager-route53-$"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("MY_DOMAIN"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),s("span",{pre:!0,attrs:{class:"token variable"}},[a._v(")")])]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("export")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("EKS_CERT_MANAGER_ROUTE53_AWS_SECRET_ACCESS_KEY")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token variable"}},[s("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$(")]),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("awk")]),a._v(" -F"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v('" '),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"/SecretAccessKey/ { print \\'),s("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$4")]),a._v(' }"')]),a._v(" "),s("span",{pre:!0,attrs:{class:"token environment constant"}},[a._v("$HOME")]),a._v("/.aws/$"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),s("span",{pre:!0,attrs:{class:"token environment constant"}},[a._v("USER")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("-eks-cert-manager-route53-$"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("MY_DOMAIN"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),s("span",{pre:!0,attrs:{class:"token variable"}},[a._v(")")])]),a._v("\n")])])]),s("p",[a._v("The "),s("code",[a._v("AccessKeyId")]),a._v(" and "),s("code",[a._v("SecretAccessKey")]),a._v(" is need for creating the "),s("code",[a._v("ClusterIssuer")]),a._v("\ndefinition for "),s("code",[a._v("cert-manager")]),a._v(".")]),a._v(" "),s("h2",{attrs:{id:"create-amazon-eks"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#create-amazon-eks"}},[a._v("#")]),a._v(" Create Amazon EKS")]),a._v(" "),s("p",[s("img",{attrs:{src:"https://raw.githubusercontent.com/aws-samples/eks-workshop/65b766c494a5b4f5420b2912d8373c4957163541/static/images/3-service-animated.gif",alt:"EKS",title:"EKS"}})]),a._v(" "),s("p",[a._v("Generate SSH keys if not exists:")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("test")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-f")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token environment constant"}},[a._v("$HOME")]),a._v("/.ssh/id_rsa "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("||")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("install")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-m")]),a._v(" 0700 "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-d")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token environment constant"}},[a._v("$HOME")]),a._v("/.ssh "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("&&")]),a._v(" ssh-keygen "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-b")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("2048")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-t")]),a._v(" rsa "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-f")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token environment constant"}},[a._v("$HOME")]),a._v("/.ssh/id_rsa "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-q")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-N")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('""')]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n")])])]),s("p",[a._v("Clone the Git repository:")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("git")]),a._v(" clone https://github.com/ruzickap/k8s-istio-webinar\n"),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("cd")]),a._v(" k8s-istio-webinar\n")])])]),s("p",[s("img",{attrs:{src:"https://raw.githubusercontent.com/aws-samples/eks-workshop/e2c437de2815dd0b69ada81895ea5d5144362c21/static/images/introduction/eks-product-page.png",alt:"EKS",title:"EKS"}})]),a._v(" "),s("p",[a._v("Create "),s("a",{attrs:{href:"https://aws.amazon.com/eks/",target:"_blank",rel:"noopener noreferrer"}},[a._v("Amazon EKS"),s("OutboundLink")],1),a._v(" in AWS by using "),s("a",{attrs:{href:"https://eksctl.io/",target:"_blank",rel:"noopener noreferrer"}},[a._v("eksctl"),s("OutboundLink")],1),a._v(".\nIt's a tool from Weaveworks based on official\nAWS CloudFormation templates which will be used to launch and configure our\nEKS cluster and nodes.")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("eksctl create cluster "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--name")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token variable"}},[a._v("${"),s("span",{pre:!0,attrs:{class:"token environment constant"}},[a._v("USER")]),a._v("}")]),a._v("-k8s-istio-webinar "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--tags")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"Application=Istio Webinar,Owner='),s("span",{pre:!0,attrs:{class:"token variable"}},[a._v("${"),s("span",{pre:!0,attrs:{class:"token environment constant"}},[a._v("USER")]),a._v("}")]),a._v(',Environment=Webinar,Division=Services"')]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--region")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("eu-central-1 "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n--node-type"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("t3.medium "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n--ssh-access "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n--node-ami"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("auto "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n--node-labels "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"Application=Istio_Webinar,Owner='),s("span",{pre:!0,attrs:{class:"token variable"}},[a._v("${"),s("span",{pre:!0,attrs:{class:"token environment constant"}},[a._v("USER")]),a._v("}")]),a._v(',Environment=Webinar,Division=Services"')]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("\\")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--kubeconfig")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("kubeconfig.conf\n")])])]),s("p",[a._v("Output:")]),a._v(" "),s("div",{staticClass:"language-text extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v('[ℹ]  using region eu-central-1\n[ℹ]  setting availability zones to [eu-central-1a eu-central-1b eu-central-1c]\n[ℹ]  subnets for eu-central-1a - public:192.168.0.0/19 private:192.168.96.0/19\n[ℹ]  subnets for eu-central-1b - public:192.168.32.0/19 private:192.168.128.0/19\n[ℹ]  subnets for eu-central-1c - public:192.168.64.0/19 private:192.168.160.0/19\n[ℹ]  nodegroup "ng-5be027b5" will use "ami-07c77043ca4cb9123" [AmazonLinux2/1.11]\n[ℹ]  importing SSH public key "/root/.ssh/id_rsa.pub" as "eksctl-pruzicka-k8s-istio-webinar-nodegroup-ng-5be027b5-f8:37:5c:d1:62:35:1e:21:66:a1:8e:3d:19:d0:8f:86"\n[ℹ]  creating EKS cluster "pruzicka-k8s-istio-webinar" in "eu-central-1" region\n[ℹ]  will create 2 separate CloudFormation stacks for cluster itself and the initial nodegroup\n[ℹ]  if you encounter any issues, check CloudFormation console or try \'eksctl utils describe-stacks --region=eu-central-1 --name=pruzicka-k8s-istio-webinar\'\n[ℹ]  building cluster stack "eksctl-pruzicka-k8s-istio-webinar-cluster"\n[ℹ]  creating nodegroup stack "eksctl-pruzicka-k8s-istio-webinar-nodegroup-ng-5be027b5"\n[ℹ]  --nodes-min=2 was set automatically for nodegroup ng-5be027b5\n[ℹ]  --nodes-max=2 was set automatically for nodegroup ng-5be027b5\n[✔]  all EKS cluster resource for "pruzicka-k8s-istio-webinar" had been created\n[✔]  saved kubeconfig as "kubeconfig.conf"\n[ℹ]  adding role "arn:aws:iam::822044714040:role/eksctl-pruzicka-k8s-istio-webinar-NodeInstanceRole-DVZ6BH8KDQ1K" to auth ConfigMap\n[ℹ]  nodegroup "ng-5be027b5" has 0 node(s)\n[ℹ]  waiting for at least 2 node(s) to become ready in "ng-5be027b5"\n[ℹ]  nodegroup "ng-5be027b5" has 2 node(s)\n[ℹ]  node "ip-192-168-26-217.eu-central-1.compute.internal" is ready\n[ℹ]  node "ip-192-168-69-19.eu-central-1.compute.internal" is ready\n[ℹ]  kubectl command should work with "kubeconfig.conf", try \'kubectl --kubeconfig=kubeconfig.conf get nodes\'\n[✔]  EKS cluster "pruzicka-k8s-istio-webinar" in "eu-central-1" region is ready\n')])])]),s("p",[s("img",{attrs:{src:"https://raw.githubusercontent.com/aws-samples/eks-workshop/3e7da75de884d9efeec8e8ba21161169d3e80da7/static/images/introduction/eks-architecture.svg?sanitize=true",alt:"EKS Architecture",title:"EKS Architecture"}})]),a._v(" "),s("p",[a._v("Check if the new EKS cluster is available:")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("export")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("KUBECONFIG")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token environment constant"}},[a._v("$PWD")]),a._v("/kubeconfig.conf\nkubectl get nodes "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-o")]),a._v(" wide\n")])])]),s("p",[a._v("Output:")]),a._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[a._v("NAME                                              STATUS   ROLES    AGE   VERSION   INTERNAL-IP      EXTERNAL-IP     OS-IMAGE         KERNEL-VERSION                CONTAINER-RUNTIME\nip-192-168-26-217.eu-central-1.compute.internal   Ready    "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("none"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v("   4m    v1.11.9   "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("192.168")]),a._v(".26.217   "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("18.194")]),a._v(".16.192   Amazon Linux "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("2")]),a._v("   "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("4.14")]),a._v(".104-95.84.amzn2.x86_64   docker://18.6.1\nip-192-168-69-19.eu-central-1.compute.internal    Ready    "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("none"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v("   4m    v1.11.9   "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("192.168")]),a._v(".69.19    "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("18.184")]),a._v(".88.98    Amazon Linux "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("2")]),a._v("   "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("4.14")]),a._v(".104-95.84.amzn2.x86_64   docker://18.6.1\n")])])]),s("p",[s("img",{attrs:{src:"https://raw.githubusercontent.com/aws-samples/eks-workshop/3e7da75de884d9efeec8e8ba21161169d3e80da7/static/images/introduction/eks-high-level.svg?sanitize=true",alt:"EKS High Level",title:"EKS High Level"}})]),a._v(" "),s("p",[a._v("Both worker nodes should be accessible via SSH:")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("for")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token for-or-select variable"}},[a._v("EXTERNAL_IP")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("in")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token variable"}},[s("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$(")]),a._v("kubectl get nodes "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--output")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("jsonpath"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"{.items[*].status.addresses[?(@.type=='),s("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[a._v('\\"')]),a._v("ExternalIP"),s("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[a._v('\\"')]),a._v(')].address}"')]),s("span",{pre:!0,attrs:{class:"token variable"}},[a._v(")")])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("do")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("echo")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"*** '),s("span",{pre:!0,attrs:{class:"token variable"}},[a._v("${EXTERNAL_IP}")]),a._v('"')]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("ssh")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-q")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-o")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("StrictHostKeyChecking")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("no "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-l")]),a._v(" ec2-user "),s("span",{pre:!0,attrs:{class:"token variable"}},[a._v("${EXTERNAL_IP}")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("uptime")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("done")]),a._v("\n")])])]),s("p",[a._v("Output:")]),a._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[a._v("*** "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("18.194")]),a._v(".16.192\n 09:39:19 up "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("5")]),a._v(" min,  "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("0")]),a._v(" users,  load average: "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("0.06")]),a._v(", "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("0.17")]),a._v(", "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("0.08")]),a._v("\n*** "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("18.184")]),a._v(".88.98\n 09:39:20 up "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("5")]),a._v(" min,  "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("0")]),a._v(" users,  load average: "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("0.18")]),a._v(", "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("0.12")]),a._v(", "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("0.05")]),a._v("\n")])])]),s("p",[a._v("At the end of the output you should see 2 IP addresses which\nshould be accessible by SSH using your public key "),s("code",[a._v("~/.ssh/id_rsa.pub")]),a._v(".")])])}),[],!1,null,null,null);s.default=n.exports}}]);