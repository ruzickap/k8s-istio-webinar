# Istio - Configuring Request Routing

[https://istio.io/docs/tasks/traffic-management/request-routing/](https://istio.io/docs/tasks/traffic-management/request-routing/)

This task shows you how to route requests dynamically to multiple versions
of a microservice.

## Apply a virtual service

Apply the virtual services which will route all traffic to `v1` of each
microservice:

```bash
kubectl apply -f samples/bookinfo/networking/virtual-service-all-v1.yaml
```

Display the defined routes:

```bash
kubectl get virtualservices -o yaml
```

Output:

```yaml
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: details
  ...
spec:
  hosts:
  - details
  http:
  - route:
    - destination:
        host: details
        subset: v1
---
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: productpage
  ...
spec:
  gateways:
  - bookinfo-gateway
  - mesh
  hosts:
  - productpage
  http:
  - route:
    - destination:
        host: productpage
        subset: v1
---
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: ratings
  ...
spec:
  hosts:
  - ratings
  http:
  - route:
    - destination:
        host: ratings
        subset: v1
---
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
```

Open the Bookinfo site in your browser [http://mylabs.dev/productpage](http://mylabs.dev/productpage)
and notice that the reviews part of the page displays with **no rating stars**,
no matter how many times you refresh.

![Bookinfo v1](./bookinfo_v1.jpg "Bookinfo v1")

## Route based on user identity

[https://istio.io/docs/tasks/traffic-management/request-routing/#route-based-on-user-identity](https://istio.io/docs/tasks/traffic-management/request-routing/#route-based-on-user-identity)

All traffic from a user named `jason` will be routed to the service `reviews:v2`
by forwarding HTTP requests with custom end-user header to the appropriate
reviews service.

Enable user-based routing:

```bash
kubectl apply -f samples/bookinfo/networking/virtual-service-reviews-test-v2.yaml
```

Confirm the rule is created:

```bash
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
  - match:
    - headers:
        end-user:
          exact: jason
    route:
    - destination:
        host: reviews
        subset: v2
  - route:
    - destination:
        host: reviews
        subset: v1
```

On the `/productpage` of the Bookinfo app, log in as user `jason` and refresh
the browser. The **black star ratings** appear next to each review.

![Bookinfo v2](./bookinfo_v2.jpg "Bookinfo v2")

Log in as another user (pick any name you wish) and refresh the browser. Now
the **stars are gone**. This is because traffic is routed to reviews:v1 for all
users except Jason.

You can do the same with `user-agent header` or `URI` for example:

```yaml
  ...
  http:
    - match:
      - headers:
        user-agent:
          regex: '.*Firefox.*'
  ...
  http:
    - match:
      - uri:
        prefix: /api/v1
  ...
```

![Istio](../.vuepress/public/istio.svg "Istio")
