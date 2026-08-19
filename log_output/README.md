# Log output

## Exercise 3.3. To the Gateway

```bash
gcloud container clusters update dwk-cluster \
  --location=europe-north1-b \
  --gateway-api=standard

kubectl apply -f ping_pong/manifests/service.yaml
kubectl apply -f log_output/manifests/service.yaml

kubectl delete ingress exercises-ing -n exercises --ignore-not-found

kubectl apply -f manifests/gateway.yaml
kubectl apply -f manifests/route.yaml

kubectl get pods -n exercises
kubectl get svc -n exercises
kubectl get gateway -n exercises
kubectl get httproute -n exercises
```

Browser:

```text
http://ADDRESS/pingpong
http://ADDRESS/logoutput
```
