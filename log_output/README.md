# Log output

## Exercise 2.1. Connecting pods

```bash
cd ping_pong
docker build -t ssteevooh/ping_pong:2.1 .
docker push ssteevooh/ping_pong:2.1
kubectl apply -f manifests
kubectl delete pod -l app=pingpong

cd ../log_output/writer
docker build -t ssteevooh/log_output_writer:2.1 .
docker push ssteevooh/log_output_writer:2.1

cd ../reader
docker build -t ssteevooh/log_output_reader:2.1 .
docker push ssteevooh/log_output_reader:2.1

cd ..
kubectl apply -f manifests
kubectl delete pod -l app=logoutput

kubectl get pods
kubectl get svc,ing
kubectl logs deployment/log-output-dep -c log-output-writer
kubectl logs deployment/log-output-dep -c log-output-reader
kubectl logs deployment/ping-pong-dep
```

Browser:

```text
http://localhost:8081/pingpong
http://localhost:8081/logoutput
```