# Log output

## Exercise 2.3. Keep them separated

```bash
kubectl create namespace exercises

kubectl apply -f log_output/manifests
kubectl apply -f ping_pong/manifests

kubectl get all -n exercises
kubectl get ing -n exercises
```

Browser:

```text
http://localhost:8081/logoutput
http://localhost:8081/pingpong
```