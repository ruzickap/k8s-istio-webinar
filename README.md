# Istio webinar

[![Build Status](https://github.com/ruzickap/k8s-istio-webinar/workflows/vuepress-build/badge.svg)](https://github.com/ruzickap/k8s-istio-webinar)

[Istio](https://istio.io/) is an open platform to connect, secure, control
and observe microservices, also known as a service mesh, on cloud platforms
such as Kubernetes.

![Istio](./istio.svg "Istio")

With Istio, you can manage network traffic, load balance across microservices,
enforce access policies, verify service identity, secure service communication,
and observe what exactly is going on with your services.

* GitHub repository: [https://github.com/ruzickap/k8s-istio-webinar](https://github.com/ruzickap/k8s-istio-webinar)
* Web Pages: [https://ruzickap.github.io/k8s-istio-webinar](https://ruzickap.github.io/k8s-istio-webinar)
* Presentation: [https://slides.com/ruzickap/k8s-istio-webinar](https://slides.com/ruzickap/k8s-istio-webinar)
* YouTube: [https://youtu.be/6S3Cr_eJqiU](https://youtu.be/6S3Cr_eJqiU)
* Asciinema webinar screencast: [https://asciinema.org/a/237567](https://asciinema.org/a/237567?autoplay=1)

## Requirements

* [awscli](https://aws.amazon.com/cli/)
* [AWS IAM Authenticator for Kubernetes](https://github.com/kubernetes-sigs/aws-iam-authenticator)
* [AWS account](https://aws.amazon.com/account/)
* [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
* [eksctl](https://eksctl.io/)
* Kubernetes and Linux knowledge required

## Objectives

* Download and install Istio in your cluster
* Deploy the Bookinfo application
* Use metrics, logging, and tracing to observe services
* Set up the Istio Ingress Gateway
* Perform simple traffic management, such as A/B tests and canary deployments
* Secure your service mesh

## Webinar

* [Part 01 - Create EKS cluster](https://github.com/ruzickap/k8s-istio-webinar/tree/master/docs/part-01/README.md)
* [Part 02 - Install Helm](https://github.com/ruzickap/k8s-istio-webinar/tree/master/docs/part-02/README.md)
* [Part 03 - Istio - Installation](https://github.com/ruzickap/k8s-istio-webinar/tree/master/docs/part-03/README.md)
* [Part 04 - Istio - Bookinfo Application](https://github.com/ruzickap/k8s-istio-webinar/tree/master/docs/part-04/README.md)
* [Part 05 - Istio - Configuring Request Routing](https://github.com/ruzickap/k8s-istio-webinar/tree/master/docs/part-05/README.md)
* [Part 06 - Istio - Injecting an HTTP delay fault](https://github.com/ruzickap/k8s-istio-webinar/tree/master/docs/part-06/README.md)
* [Part 07 - Istio - Weight-based routing](https://github.com/ruzickap/k8s-istio-webinar/tree/master/docs/part-07/README.md)
* [Part 08 - Istio - Cleanup](https://github.com/ruzickap/k8s-istio-webinar/tree/master/docs/part-08/README.md)

## Links

* Video:

  * [Istio Service Mesh by Mete Atamel @ .NET Conf UY v2018](https://www.youtube.com/watch?v=sh0F7FMFVSI)

  * [Liam White - Istio @ GDGReading DevFest 2018](https://www.youtube.com/watch?v=RVScqW8_liw)

  * [Istio Service Mesh & pragmatic microservices architecture - Álex Soto](https://www.youtube.com/watch?v=OAW5rbttic0)

* Pages:

  * [Introduction - Istio 101 Lab](https://istio101.gitbook.io/lab/workshop/)

  * [Using Istio Workshop by Layer5.io](https://github.com/leecalcote/istio-service-mesh-workshop)

  * [Istio Workshop by Ray Tsang](https://github.com/retroryan/istio-workshop)

  * [Amazon EKS Workshop - Service Mesh with Istio](https://eksworkshop.com/servicemesh_with_istio/)
