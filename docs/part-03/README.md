# Istio - Installation

Istio architectue

![Istio Architecture](https://raw.githubusercontent.com/istio/istio.io/7bf371365e4a16a9a13c0e79355fe1eac7f8f99f/content/docs/concepts/what-is-istio/arch.svg?sanitize=true
"Istio Architecture")

Either download Istio directly from [https://github.com/istio/istio/releases](https://github.com/istio/istio/releases)
or get the latest version by using curl:

```bash
export ISTIO_VERSION="1.1.0"
test -d tmp || mkdir tmp
cd tmp
curl -sL https://git.io/getLatestIstio | sh -
```

Change the directory to the Istio installation files location:

```bash
cd istio*
```

Install `istioctl`:

```bash
test -x /usr/local/bin/istioctl || sudo mv bin/istioctl /usr/local/bin/
```

Install the `istio-init` chart to bootstrap all the Istio's CRDs

```bash
helm install install/kubernetes/helm/istio-init --wait --name istio-init --namespace istio-system
sleep 30
```

Install [Istio](https://istio.io/):

```bash
helm install install/kubernetes/helm/istio --wait --name istio --namespace istio-system \
  --set grafana.enabled=true \
  --set kiali.enabled=true \
  --set kiali.createDemoSecret=true \
  --set kiali.contextPath=/ \
  --set kiali.dashboard.grafanaURL=http://grafana.mylabs.dev/ \
  --set kiali.dashboard.jaegerURL=http://jaeger.mylabs.dev/ \
  --set servicegraph.enabled=true \
  --set tracing.enabled=true \
  --set global.configValidation=false \
  --set sidecarInjectorWebhook.enabled=false
```

Create DNS record `mylabs.dev` for the Ingress loadbalancer:

```bash
LOADBALANCER_HOSTNAME=$(kubectl get svc istio-ingressgateway -n istio-system -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')
CANONICAL_HOSTED_ZONE_NAME_ID=$(aws elb describe-load-balancers --query "LoadBalancerDescriptions[?DNSName=='$LOADBALANCER_HOSTNAME'].CanonicalHostedZoneNameID" --output text)
HOSTED_ZONE_ID=$(aws route53 list-hosted-zones --query "HostedZones[?Name=='mylabs.dev.'].Id" --output text)

cat > /tmp/aws_route53-dns_change.json << EOF
{
  "Comment": "A new record set for the zone.",
  "Changes": [
    {
      "Action": "UPSERT",
      "ResourceRecordSet": {
        "Name": "*.mylabs.dev.",
        "Type": "A",
        "AliasTarget":{
          "HostedZoneId": "${CANONICAL_HOSTED_ZONE_NAME_ID}",
          "DNSName": "dualstack.${LOADBALANCER_HOSTNAME}",
          "EvaluateTargetHealth": false
        }
      }
    },
    {
      "Action": "UPSERT",
      "ResourceRecordSet": {
        "Name": "mylabs.dev.",
        "Type": "A",
        "AliasTarget":{
          "HostedZoneId": "${CANONICAL_HOSTED_ZONE_NAME_ID}",
          "DNSName": "dualstack.${LOADBALANCER_HOSTNAME}",
          "EvaluateTargetHealth": false
        }
      }
    }
  ]
}
EOF

aws route53 change-resource-record-sets --hosted-zone-id ${HOSTED_ZONE_ID} --change-batch file:///tmp/aws_route53-dns_change.json
```

See the Istio components:

```bash
kubectl get --namespace=istio-system svc,deployment,pods,job,horizontalpodautoscaler,destinationrule
```

Output:

```shell
NAME                           TYPE           CLUSTER-IP       EXTERNAL-IP                                                                  PORT(S)                                                                                                                                      AGE
service/grafana                ClusterIP      172.20.160.134   <none>                                                                       3000/TCP                                                                                                                                     8m
service/istio-citadel          ClusterIP      172.20.218.253   <none>                                                                       8060/TCP,15014/TCP                                                                                                                           8m
service/istio-galley           ClusterIP      172.20.107.2     <none>                                                                       443/TCP,15014/TCP,9901/TCP                                                                                                                   8m
service/istio-ingressgateway   LoadBalancer   172.20.1.22      ace7955ea4af111e9a4b506067c146aa-1152510672.eu-central-1.elb.amazonaws.com   80:31380/TCP,443:31390/TCP,31400:31400/TCP,15029:31608/TCP,15030:32261/TCP,15031:30239/TCP,15032:31495/TCP,15443:30380/TCP,15020:32590/TCP   8m
service/istio-pilot            ClusterIP      172.20.119.182   <none>                                                                       15010/TCP,15011/TCP,8080/TCP,15014/TCP                                                                                                       8m
service/istio-policy           ClusterIP      172.20.202.102   <none>                                                                       9091/TCP,15004/TCP,15014/TCP                                                                                                                 8m
service/istio-telemetry        ClusterIP      172.20.91.195    <none>                                                                       9091/TCP,15004/TCP,15014/TCP,42422/TCP                                                                                                       8m
service/jaeger-agent           ClusterIP      None             <none>                                                                       5775/UDP,6831/UDP,6832/UDP                                                                                                                   8m
service/jaeger-collector       ClusterIP      172.20.65.184    <none>                                                                       14267/TCP,14268/TCP                                                                                                                          8m
service/jaeger-query           ClusterIP      172.20.69.199    <none>                                                                       16686/TCP                                                                                                                                    8m
service/kiali                  ClusterIP      172.20.188.136   <none>                                                                       20001/TCP                                                                                                                                    8m
service/prometheus             ClusterIP      172.20.115.106   <none>                                                                       9090/TCP                                                                                                                                     8m
service/servicegraph           ClusterIP      172.20.79.181    <none>                                                                       8088/TCP                                                                                                                                     8m
service/tracing                ClusterIP      172.20.175.151   <none>                                                                       80/TCP                                                                                                                                       8m
service/zipkin                 ClusterIP      172.20.210.156   <none>                                                                       9411/TCP                                                                                                                                     8m

NAME                                         DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
deployment.extensions/grafana                1         1         1            1           8m
deployment.extensions/istio-citadel          1         1         1            1           8m
deployment.extensions/istio-galley           1         1         1            1           8m
deployment.extensions/istio-ingressgateway   1         1         1            1           8m
deployment.extensions/istio-pilot            1         1         1            1           8m
deployment.extensions/istio-policy           1         1         1            1           8m
deployment.extensions/istio-telemetry        1         1         1            1           8m
deployment.extensions/istio-tracing          1         1         1            1           8m
deployment.extensions/kiali                  1         1         1            1           8m
deployment.extensions/prometheus             1         1         1            1           8m
deployment.extensions/servicegraph           1         1         1            1           8m

NAME                                        READY   STATUS      RESTARTS   AGE
pod/grafana-7b46bf6b7c-xfgpn                1/1     Running     0          8m
pod/istio-citadel-75fdb679db-lbns5          1/1     Running     0          8m
pod/istio-galley-c864b5c86-xrhj6            1/1     Running     0          8m
pod/istio-ingressgateway-668676fbdb-hh87s   1/1     Running     0          8m
pod/istio-init-crd-10-2p5kb                 0/1     Completed   0          8m
pod/istio-init-crd-11-mx8xh                 0/1     Completed   0          8m
pod/istio-pilot-f4c98cfbf-4zw4p             2/2     Running     0          8m
pod/istio-policy-6cbbd844dd-f2s28           2/2     Running     3          8m
pod/istio-telemetry-ccc4df498-q9bw4         2/2     Running     2          8m
pod/istio-tracing-75dd89b8b4-2r822          1/1     Running     0          8m
pod/kiali-64b5fbbf94-srvtx                  1/1     Running     0          8m
pod/prometheus-89bc5668c-hnq4n              1/1     Running     0          8m
pod/servicegraph-5d4b49848-s2g86            1/1     Running     1          8m

NAME                          DESIRED   SUCCESSFUL   AGE
job.batch/istio-init-crd-10   1         1            8m
job.batch/istio-init-crd-11   1         1            8m

NAME                                                       REFERENCE                         TARGETS         MINPODS   MAXPODS   REPLICAS   AGE
horizontalpodautoscaler.autoscaling/istio-ingressgateway   Deployment/istio-ingressgateway   <unknown>/80%   1         5         1          8m
horizontalpodautoscaler.autoscaling/istio-pilot            Deployment/istio-pilot            <unknown>/80%   1         5         1          8m
horizontalpodautoscaler.autoscaling/istio-policy           Deployment/istio-policy           <unknown>/80%   1         5         1          8m
horizontalpodautoscaler.autoscaling/istio-telemetry        Deployment/istio-telemetry        <unknown>/80%   1         5         1          8m

NAME                                                  HOST                                             AGE
destinationrule.networking.istio.io/istio-policy      istio-policy.istio-system.svc.cluster.local      8m
destinationrule.networking.istio.io/istio-telemetry   istio-telemetry.istio-system.svc.cluster.local   8m
```

Configure the Istio services ([Jaeger](https://www.jaegertracing.io/),
[Prometheus](https://prometheus.io/), [Grafana](https://grafana.com/),
[Kiali](http://kiali.mylabs.dev), Servicegraph) to be visible "outside":

```bash
kubectl create -f ../../files/export_services_gateway.yaml
```

![Istio](../.vuepress/public/istio.svg "Istio")
