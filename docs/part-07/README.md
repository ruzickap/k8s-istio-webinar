# Istio - Weight-based routing

[https://istio.io/docs/tasks/traffic-management/traffic-shifting/#apply-weight-based-routing](https://istio.io/docs/tasks/traffic-management/traffic-shifting/#apply-weight-based-routing)

In **Canary Deployments**, newer versions of services are incrementally rolled
out to users to minimize the risk and impact of any bugs introduced by the newer
version.

![Traffic Management with Istio](https://raw.githubusercontent.com/istio/istio.io/7bf371365e4a16a9a13c0e79355fe1eac7f8f99f/content/docs/concepts/traffic-management/ServiceModel_Versions.svg?sanitize=true
"Traffic Management with Istio")

Route a percentage of traffic to one service or another - send **%50**
of traffic to `reviews:v1` and **%50** to `reviews:v3` and finally complete
the migration by sending **%100** of traffic to `reviews:v3`.

Route all traffic to the `reviews:v1` version of each microservice:

```bash
kubectl apply -f samples/bookinfo/networking/virtual-service-all-v1.yaml
```

Transfer **50%** of the traffic from `reviews:v1` to `reviews:v3`:

```bash
kubectl apply -f samples/bookinfo/networking/virtual-service-reviews-50-v3.yaml
kubectl get virtualservice reviews -o yaml
```

Output:

```yaml
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: reviews
  ...
spec:
  hosts:
  - reviews
  http:
  - route:
    - destination:
        host: reviews
        subset: v1
      weight: 50
    - destination:
        host: reviews
        subset: v3
      weight: 50
```

Refresh the `/productpage` in your browser and you now see
**red colored star** ratings approximately **50%** of the time.

Check the flows in Kiali graph, where only `reviews:{v1,v2}` are used:

![Weight-based routing Kiali Graph](./istio_kiali_weight-based_routing.gif
"Weight-based routing Kiali Graph")

Assuming you decide that the `reviews:v3` microservice is stable, you can
route **100%** of the traffic to `reviews:v3` by applying this virtual service.

```bash
kubectl apply -f samples/bookinfo/networking/virtual-service-reviews-v3.yaml
kubectl get virtualservice reviews -o yaml
```

Output:

```shell
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
...
spec:
  hosts:
  - reviews
  http:
  - route:
    - destination:
        host: reviews
        subset: v3
```

When you refresh the `/productpage` you will always see book reviews
with **red colored star** ratings for **each** review.

![Bookinfo v3](./bookinfo_v3.jpg "Bookinfo v3")

Kiali graph:

![Kiali - Bookinfo v3](./istio_kiali_weight-based_routing-bookinfo_v3.gif
"Kiali - Bookinfo v3")

![Istio](../.vuepress/public/istio.svg "Istio")
