# Log output

## Exercise 2.5. Documentation and ConfigMaps

```bash
kubectl create namespace exercises

cd log_output/writer
docker build -t ssteevooh/log_output_writer:2.5 .
docker push ssteevooh/log_output_writer:2.5

cd ../reader
docker build -t ssteevooh/log_output_reader:2.5 .
docker push ssteevooh/log_output_reader:2.5

cd ../..
kubectl apply -f log_output/manifests
kubectl apply -f ping_pong/manifests
kubectl delete pod -l app=logoutput -n exercises

kubectl get all -n exercises
kubectl get configmap -n exercises
kubectl get ing -n exercises
kubectl logs deployment/log-output-dep -c log-output-reader -n exercises
```

Browser:

```text
http://localhost:8081/logoutput
http://localhost:8081/pingpong
```
