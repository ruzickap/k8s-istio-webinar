# Istio - Installation

Istio architecture:

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

Install the `istio-init` chart to bootstrap all the Istio's CRDs:

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

Allow the `default` namespace to use Istio injection:

```bash
kubectl label namespace default istio-injection=enabled
```

Check namespaces:

```bash
kubectl get namespace -L istio-injection
```

Output:

```shell
NAME           STATUS   AGE   ISTIO-INJECTION
default        Active   11m   enabled
istio-system   Active   1m
kube-public    Active   11m
kube-system    Active   11m
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
NAME                             TYPE           CLUSTER-IP       EXTERNAL-IP                                                                 PORT(S)                                                                                                                                      AGE
service/grafana                  ClusterIP      10.100.5.117     <none>                                                                      3000/TCP                                                                                                                                     2m
service/istio-citadel            ClusterIP      10.100.225.159   <none>                                                                      8060/TCP,15014/TCP                                                                                                                           2m
service/istio-galley             ClusterIP      10.100.234.127   <none>                                                                      443/TCP,15014/TCP,9901/TCP                                                                                                                   2m
service/istio-ingressgateway     LoadBalancer   10.100.35.236    a7e9028484bf711e9816e0a4fad06eb6-288194046.eu-central-1.elb.amazonaws.com   80:31380/TCP,443:31390/TCP,31400:31400/TCP,15029:32297/TCP,15030:30518/TCP,15031:30145/TCP,15032:32031/TCP,15443:30311/TCP,15020:31713/TCP   2m
service/istio-pilot              ClusterIP      10.100.2.74      <none>                                                                      15010/TCP,15011/TCP,8080/TCP,15014/TCP                                                                                                       2m
service/istio-policy             ClusterIP      10.100.233.18    <none>                                                                      9091/TCP,15004/TCP,15014/TCP                                                                                                                 2m
service/istio-sidecar-injector   ClusterIP      10.100.92.215    <none>                                                                      443/TCP                                                                                                                                      2m
service/istio-telemetry          ClusterIP      10.100.252.68    <none>                                                                      9091/TCP,15004/TCP,15014/TCP,42422/TCP                                                                                                       2m
service/jaeger-agent             ClusterIP      None             <none>                                                                      5775/UDP,6831/UDP,6832/UDP                                                                                                                   2m
service/jaeger-collector         ClusterIP      10.100.243.102   <none>                                                                      14267/TCP,14268/TCP                                                                                                                          2m
service/jaeger-query             ClusterIP      10.100.127.65    <none>                                                                      16686/TCP                                                                                                                                    2m
service/kiali                    ClusterIP      10.100.117.19    <none>                                                                      20001/TCP                                                                                                                                    2m
service/prometheus               ClusterIP      10.100.48.137    <none>                                                                      9090/TCP                                                                                                                                     2m
service/servicegraph             ClusterIP      10.100.22.167    <none>                                                                      8088/TCP                                                                                                                                     2m
service/tracing                  ClusterIP      10.100.222.42    <none>                                                                      80/TCP                                                                                                                                       2m
service/zipkin                   ClusterIP      10.100.163.133   <none>                                                                      9411/TCP                                                                                                                                     2m

NAME                                           DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
deployment.extensions/grafana                  1         1         1            1           2m
deployment.extensions/istio-citadel            1         1         1            1           2m
deployment.extensions/istio-galley             1         1         1            1           2m
deployment.extensions/istio-ingressgateway     1         1         1            1           2m
deployment.extensions/istio-pilot              1         1         1            1           2m
deployment.extensions/istio-policy             1         1         1            1           2m
deployment.extensions/istio-sidecar-injector   1         1         1            1           2m
deployment.extensions/istio-telemetry          1         1         1            1           2m
deployment.extensions/istio-tracing            1         1         1            1           2m
deployment.extensions/kiali                    1         1         1            1           2m
deployment.extensions/prometheus               1         1         1            1           2m
deployment.extensions/servicegraph             1         1         1            1           2m

NAME                                          READY   STATUS      RESTARTS   AGE
pod/grafana-7b46bf6b7c-2zqqw                  1/1     Running     0          2m
pod/istio-citadel-75fdb679db-qx2rt            1/1     Running     0          2m
pod/istio-galley-c864b5c86-7x4f8              1/1     Running     0          2m
pod/istio-ingressgateway-668676fbdb-6fhkw     1/1     Running     0          2m
pod/istio-init-crd-10-t97s4                   0/1     Completed   0          2m
pod/istio-init-crd-11-fb5qg                   0/1     Completed   0          2m
pod/istio-pilot-f4c98cfbf-h28dt               2/2     Running     0          2m
pod/istio-policy-6cbbd844dd-72q5f             2/2     Running     2          2m
pod/istio-sidecar-injector-7b47cb4689-xtpm4   1/1     Running     0          2m
pod/istio-telemetry-ccc4df498-p2vcq           2/2     Running     2          2m
pod/istio-tracing-75dd89b8b4-pv5pz            1/1     Running     0          2m
pod/kiali-7787748c7d-l7mdd                    1/1     Running     0          2m
pod/prometheus-89bc5668c-wgl47                1/1     Running     0          2m
pod/servicegraph-5d4b49848-7mqbp              1/1     Running     0          2m

NAME                          DESIRED   SUCCESSFUL   AGE
job.batch/istio-init-crd-10   1         1            2m
job.batch/istio-init-crd-11   1         1            2m

NAME                                                       REFERENCE                         TARGETS         MINPODS   MAXPODS   REPLICAS   AGE
horizontalpodautoscaler.autoscaling/istio-ingressgateway   Deployment/istio-ingressgateway   <unknown>/80%   1         5         1          2m
horizontalpodautoscaler.autoscaling/istio-pilot            Deployment/istio-pilot            <unknown>/80%   1         5         1          2m
horizontalpodautoscaler.autoscaling/istio-policy           Deployment/istio-policy           <unknown>/80%   1         5         1          2m
horizontalpodautoscaler.autoscaling/istio-telemetry        Deployment/istio-telemetry        <unknown>/80%   1         5         1          2m

NAME                                                  HOST                                             AGE
destinationrule.networking.istio.io/istio-policy      istio-policy.istio-system.svc.cluster.local      2m
destinationrule.networking.istio.io/istio-telemetry   istio-telemetry.istio-system.svc.cluster.local   2m
```

Configure the Istio services ([Jaeger](https://www.jaegertracing.io/),
[Prometheus](https://prometheus.io/), [Grafana](https://grafana.com/),
[Kiali](http://kiali.mylabs.dev), Servicegraph) to be visible externally:

```bash
kubectl create -f ../../files/export_services_gateway.yaml
```

![Istio](../.vuepress/public/istio.svg "Istio")
