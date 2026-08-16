# Ping-pong

## Exercise 2.7. Stateful applications

```bash
kubectl create namespace exercises

cd ping_pong
docker build -t ssteevooh/ping_pong:2.7 .
docker push ssteevooh/ping_pong:2.7

cd ..
kubectl apply -f ping_pong/manifests/postgres.yaml
kubectl apply -f ping_pong/manifests
kubectl apply -f log_output/manifests

kubectl delete pod -l app=pingpong -n exercises
kubectl delete pod -l app=logoutput -n exercises

kubectl get all -n exercises
kubectl get pvc -n exercises
kubectl get ing -n exercises
```

Browser:

```text
http://localhost:8081/pingpong
http://localhost:8081/logoutput
```
