# Ping-pong

## Exercise 3.4. Rewritten routing

```bash
cd ping_pong
docker build -t ssteevooh/ping_pong:3.4 .
docker push ssteevooh/ping_pong:3.4

cd ..
kubectl apply -f ping_pong/manifests/deployment.yaml
kubectl apply -f manifests/route.yaml

kubectl get pods -n exercises
kubectl get gateway -n exercises
kubectl get httproute -n exercises
```

Browser:

```text
http://ADDRESS/pingpong
```
