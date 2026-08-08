# Ping-pong

## Exercise 1.9. More services

```bash
docker build -t ssteevooh/ping_pong:1.9 .
docker push ssteevooh/ping_pong:1.9
kubectl apply -f manifests
kubectl apply -f ../log_output/manifests/ingress.yaml
kubectl get pods
kubectl get svc,ing
kubectl logs deployment/ping-pong-dep
```

Browser:

```text
http://localhost:8081/pingpong
```