# Istio - Bookinfo Application

The Bookinfo application is broken into four separate microservices:

* `productpage` - the productpage microservice calls the details and reviews
  microservices to populate the page.
* `details` - the details microservice contains book information.
* `reviews` - the reviews microservice contains book reviews. It also calls
  the ratings microservice.
* `ratings` - the ratings microservice contains book ranking information
  that accompanies a book review.

There are 3 versions of the `reviews` microservice:

* Version `v1` - doesn't call the **ratings service**.

  ![Bookinfo v1](./bookinfo_v1_raiting.png "Bookinfo v1")

* Version `v2` - calls the ratings service, and displays each rating as 1 to 5
  **black stars**.

  ![Bookinfo v2](./bookinfo_v2_raiting.png "Bookinfo v2")

* Version `v3` - calls the ratings service, and displays each rating as 1 to 5
  **red stars**.

  ![Bookinfo v3](./bookinfo_v3_raiting.png "Bookinfo v3")

[Bookinfo](https://istio.io/docs/examples/bookinfo/) application architecture:

![Application Architecture with Istio](https://raw.githubusercontent.com/istio/istio.io/7bf371365e4a16a9a13c0e79355fe1eac7f8f99f/content/docs/examples/bookinfo/withistio.svg?sanitize=true
"Application Architecture with Istio")

Deploy the demo of [Bookinfo](https://istio.io/docs/examples/bookinfo/) application:

```bash
#kubectl apply -f <(istioctl kube-inject -f samples/bookinfo/platform/kube/bookinfo.yaml)
kubectl apply -f samples/bookinfo/platform/kube/bookinfo.yaml
sleep 400
```

Confirm all services and pods are correctly defined and running:

```bash
kubectl get svc,deployment,pods -o wide
```

Output:

```shell
NAME                  TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)    AGE   SELECTOR
service/details       ClusterIP   10.100.115.146   <none>        9080/TCP   1m    app=details
service/kubernetes    ClusterIP   10.100.0.1       <none>        443/TCP    15m   <none>
service/productpage   ClusterIP   10.100.32.226    <none>        9080/TCP   1m    app=productpage
service/ratings       ClusterIP   10.100.174.231   <none>        9080/TCP   1m    app=ratings
service/reviews       ClusterIP   10.100.249.195   <none>        9080/TCP   1m    app=reviews

NAME                                   DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE   CONTAINERS    IMAGES                                          SELECTOR
deployment.extensions/details-v1       1         1         1            1           1m    details       istio/examples-bookinfo-details-v1:1.10.1       app=details,version=v1
deployment.extensions/productpage-v1   1         1         1            1           1m    productpage   istio/examples-bookinfo-productpage-v1:1.10.1   app=productpage,version=v1
deployment.extensions/ratings-v1       1         1         1            1           1m    ratings       istio/examples-bookinfo-ratings-v1:1.10.1       app=ratings,version=v1
deployment.extensions/reviews-v1       1         1         1            1           1m    reviews       istio/examples-bookinfo-reviews-v1:1.10.1       app=reviews,version=v1
deployment.extensions/reviews-v2       1         1         1            1           1m    reviews       istio/examples-bookinfo-reviews-v2:1.10.1       app=reviews,version=v2
deployment.extensions/reviews-v3       1         1         1            1           1m    reviews       istio/examples-bookinfo-reviews-v3:1.10.1       app=reviews,version=v3

NAME                                  READY   STATUS    RESTARTS   AGE   IP               NODE                                              NOMINATED NODE
pod/details-v1-68868454f5-fgckz       2/2     Running   0          1m    192.168.0.110    ip-192-168-11-227.eu-central-1.compute.internal   <none>
pod/productpage-v1-5cb458d74f-vr6f2   2/2     Running   0          1m    192.168.44.120   ip-192-168-42-115.eu-central-1.compute.internal   <none>
pod/ratings-v1-76f4c9765f-vx54k       2/2     Running   0          1m    192.168.30.241   ip-192-168-11-227.eu-central-1.compute.internal   <none>
pod/reviews-v1-56f6855586-gbfrm       2/2     Running   0          1m    192.168.25.4     ip-192-168-11-227.eu-central-1.compute.internal   <none>
pod/reviews-v2-65c9df47f8-258sx       2/2     Running   0          1m    192.168.62.144   ip-192-168-42-115.eu-central-1.compute.internal   <none>
pod/reviews-v3-6cf47594fd-ncgm5       2/2     Running   0          1m    192.168.50.202   ip-192-168-42-115.eu-central-1.compute.internal   <none>
```

Check the container details - you should see also container `istio-proxy` next
to `productpage` container.

```bash
kubectl describe pod -l app=productpage
```

Output:

```shell
...
Containers:
  productpage:
    Container ID:   docker://c145182a97f7ff526c6a22009771cc67ddb0a8995131607d4242cbcb0eef358e
    Image:          istio/examples-bookinfo-productpage-v1:1.10.1
...
  istio-proxy:
    Container ID:  docker://1fe8c140ef45060f07ae72173e512e872f9a0e9e23a42922545dea9797be3347
    Image:         docker.io/istio/proxyv2:1.1.0
...
```

The `kubectl logs` command will show you the output of the envoy proxy:

```bash
kubectl logs $(kubectl get pod -l app=productpage -o jsonpath="{.items[0].metadata.name}") istio-proxy | head -70
```

Output:

```shell
...
2019-03-21T16:41:16.466062Z     info    Effective config: binaryPath: /usr/local/bin/envoy
concurrency: 2
configPath: /etc/istio/proxy
connectTimeout: 10s
discoveryAddress: istio-pilot.istio-system:15010
drainDuration: 45s
parentShutdownDuration: 60s
proxyAdminPort: 15000
serviceCluster: productpage.default
statNameLength: 189
tracing:
  zipkin:
    address: zipkin.istio-system:9411

2019-03-21T16:41:16.466078Z     info    Monitored certs: []envoy.CertSource{envoy.CertSource{Directory:"/etc/certs/", Files:[]string{"cert-chain.pem", "key.pem", "root-cert.pem"}}}
2019-03-21T16:41:16.466086Z     info    PilotSAN []string(nil)
2019-03-21T16:41:16.467206Z     info    Opening status port 15020

2019-03-21T16:41:16.467636Z     info    Starting proxy agent
2019-03-21T16:41:16.467917Z     info    Received new config, resetting budget
2019-03-21T16:41:16.467924Z     info    Reconciling retry (budget 10)
2019-03-21T16:41:16.468219Z     info    Epoch 0 starting
2019-03-21T16:41:16.469316Z     info    Envoy command: [-c /etc/istio/proxy/envoy-rev0.json --restart-epoch 0 --drain-time-s 45 --parent-shutdown-time-s 60 --service-cluster productpage.default --service-node sidecar~192.168.44.120~productpage-v1-5cb458d74f-vr6f2.default~default.svc.cluster.local --max-obj-name-len 189 --allow-unknown-fields -l warning --concurrency 2]
...
```

Define the [Istio gateway](https://istio.io/docs/reference/config/istio.networking.v1alpha3/#Gateway)
for the application:

```bash
cat samples/bookinfo/networking/bookinfo-gateway.yaml
kubectl apply -f samples/bookinfo/networking/bookinfo-gateway.yaml
sleep 5
```

Output:

```shell
apiVersion: networking.istio.io/v1alpha3
kind: Gateway
metadata:
  name: bookinfo-gateway
spec:
  selector:
    istio: ingressgateway # use istio default controller
  servers:
  - port:
      number: 80
      name: http
      protocol: HTTP
    hosts:
    - "*"
---
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: bookinfo
spec:
  hosts:
  - "*"
  gateways:
  - bookinfo-gateway
  http:
  - match:
    - uri:
        exact: /productpage
    - uri:
        exact: /login
    - uri:
        exact: /logout
    - uri:
        prefix: /api/v1/products
    route:
    - destination:
        host: productpage
        port:
          number: 9080
```

Confirm the gateway and virtualsevice has been created:

```bash
kubectl get gateway,virtualservice
```

Output:

```shell
NAME                                           AGE
gateway.networking.istio.io/bookinfo-gateway   7s

NAME                                          GATEWAYS             HOSTS   AGE
virtualservice.networking.istio.io/bookinfo   [bookinfo-gateway]   [*]     7s
```

Point your browser to [http://mylabs.dev/productpage](http://mylabs.dev/productpage).

Confirm the app is running:

```bash
curl -o /dev/null -s -w "%{http_code}\n" -A "Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_3_3 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8J2 Safari/6533.18.5" http://mylabs.dev/productpage
```

Output:

```shell
200
```

Create default [destination rules](https://istio.io/docs/reference/config/istio.networking.v1alpha3/#DestinationRule)
(subsets) for the Bookinfo services:

```bash
kubectl apply -f samples/bookinfo/networking/destination-rule-all.yaml
```

Display the destination rules:

```bash
kubectl get destinationrules -o yaml
```

Output:

```shell
...
- apiVersion: networking.istio.io/v1alpha3
  kind: DestinationRule
...
    name: reviews
    namespace: default
...
  spec:
    host: reviews
    subsets:
    - labels:
        version: v1
      name: v1
    - labels:
        version: v2
      name: v2
    - labels:
        version: v3
      name: v3
...
```

Generate some traffic for next 5 minutes to gather some data:

```bash
siege --log=/tmp/siege --concurrent=1 -q --internet --time=5M http://mylabs.dev/productpage &
```

Open the browser with these pages:

* Servicegraph:

  * [http://servicegraph.mylabs.dev/force/forcegraph.html](http://servicegraph.mylabs.dev/force/forcegraph.html)

  * [http://servicegraph.mylabs.dev/dotviz](http://servicegraph.mylabs.dev/dotviz)

* [Kiali](https://www.kiali.io/):

  * [http://kiali.mylabs.dev](http://kiali.mylabs.dev) (admin/admin)

* [Jaeger](https://www.jaegertracing.io/):

  * [http://jaeger.mylabs.dev](http://jaeger.mylabs.dev)

* [Prometheus](https://prometheus.io/):

  * [http://prometheus.mylabs.dev/graph?g0.range_input=1h&g0.expr=istio_requests_total&g0.tab=0](http://prometheus.mylabs.dev/graph?g0.range_input=1h&g0.expr=istio_requests_total&g0.tab=0)

* [Grafana](https://grafana.com/):

  * [http://grafana.mylabs.dev](http://grafana.mylabs.dev)

  * Grafana -> Home -> Istio ->

    * Istio Performance Dashboard

    * Istio Service Dashboard

    * Istio Workload Dashboard

Open the Bookinfo site in your browser [http://mylabs.dev/productpage](http://mylabs.dev/productpage)
and refresh the page several times - you should see different versions
of reviews shown in productpage, presented in a **round robin style**
(red stars, black stars, no stars), since we haven't yet used Istio to control
the version routing.

![Bookinfo v1, v3, v2](./bookinfo_v1_v3_v2.gif "Bookinfo v1, v3, v2")

Check the flows in [Kiali](https://www.kiali.io/) graph:

![Istio Graph](./istio_kiali_graph.gif "Istio Graph")

![Istio](../.vuepress/public/istio.svg "Istio")
