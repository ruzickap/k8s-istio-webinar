# Istio - Injecting an HTTP delay fault

[https://istio.io/docs/tasks/traffic-management/fault-injection/#injecting-an-http-delay-fault](https://istio.io/docs/tasks/traffic-management/fault-injection/#injecting-an-http-delay-fault)

Inject a 7 seconds delay between the `reviews:v2` and ratings microservices for
user `jason`:

```bash
kubectl apply -f samples/bookinfo/networking/virtual-service-ratings-test-delay.yaml
kubectl get virtualservice ratings -o yaml
```

Output:

```yaml
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: ratings
  ...
spec:
  hosts:
  - ratings
  http:
  - fault:
      delay:
        fixedDelay: 7s
        percent: 100
    match:
    - headers:
        end-user:
          exact: jason
    route:
    - destination:
        host: ratings
        subset: v1
  - route:
    - destination:
        host: ratings
        subset: v1
```

On the `/productpage`, log in as user `jason` and you should see:

```text
Error fetching product reviews!
Sorry, product reviews are currently unavailable for this book.
```

![Bookinfo Injecting an HTTP delay fault](./bookinfo_injecting_http_delay_fault.gif
"Bookinfo Injecting an HTTP delay fault")

Open the Developer Tools menu (F12) -> Network tab - web page actually loads
in about 6 seconds.

![Bookinfo Injecting an HTTP delay fault - Developer Tools](./bookinfo_injecting_http_delay_fault_developer_tools.png
"Bookinfo Injecting an HTTP delay fault - Developer Tools")

The following example introduces a **5 second delay** in **10%** of the requests
to the `ratings:v1` microservice:

```yaml
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: ratings
spec:
  hosts:
  - ratings
  http:
  - fault:
      delay:
        percent: 10
        fixedDelay: 5s
    route:
    - destination:
        host: ratings
        subset: v1
```

## Injecting an HTTP abort fault

[https://istio.io/docs/tasks/traffic-management/fault-injection/#injecting-an-http-abort-fault](https://istio.io/docs/tasks/traffic-management/fault-injection/#injecting-an-http-abort-fault)

Let's introduce an HTTP abort to the ratings microservices for the test user `jason`.

Create a fault injection rule to send an HTTP abort for user `jason`:

```bash
kubectl apply -f samples/bookinfo/networking/virtual-service-ratings-test-abort.yaml
kubectl get virtualservice ratings -o yaml
```

Output:

```yaml
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: ratings
  ...
spec:
  hosts:
  - ratings
  http:
  - fault:
      abort:
        httpStatus: 500
        percent: 100
    match:
    - headers:
        end-user:
          exact: jason
    route:
    - destination:
        host: ratings
        subset: v1
  - route:
    - destination:
        host: ratings
        subset: v1
```

On the `/productpage`, log in as user `jason` - the page loads immediately
and the product ratings not available message appears:
`Ratings service is currently unavailable`

![Bookinfo Injecting an HTTP abort fault](./bookinfo_injecting_http_abort_fault.gif
"Bookinfo Injecting an HTTP abort fault")

Check the flows in Kiali graph, where you should see the **red** communication
between `reviews:v2` and `ratings`.

![Injecting an HTTP abort fault Kiali Graph](./istio_kiali_injecting_an_http_abort_fault.gif
"Injecting an HTTP abort fault Kiali Graph")

The following example returns an **HTTP 400** error code for **10%** of the
requests to the `ratings:v1` service:

```yaml
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: ratings
spec:
  hosts:
  - ratings
  http:
  - fault:
      abort:
        percent: 10
        httpStatus: 400
    route:
    - destination:
        host: ratings
        subset: v1
```

![Istio](../.vuepress/public/istio.svg "Istio")
