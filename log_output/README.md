# Log output

## Exercise 1.11. Persisting data

```bash
docker exec k3d-k3s-default-agent-0 mkdir -p /tmp/kube
kubectl apply -f manifests/persistentvolume.yaml
kubectl apply -f manifests/persistentvolumeclaim.yaml

cd ping_pong
docker build -t ssteevooh/ping_pong:1.11 .
docker push ssteevooh/ping_pong:1.11
kubectl apply -f manifests

cd ../log_output/writer
docker build -t ssteevooh/log_output_writer:1.11 .
docker push ssteevooh/log_output_writer:1.11

cd ../reader
docker build -t ssteevooh/log_output_reader:1.11 .
docker push ssteevooh/log_output_reader:1.11

cd ..
kubectl apply -f manifests
kubectl get pods
kubectl get svc,ing
kubectl get pv,pvc
kubectl logs deployment/log-output-dep -c log-output-writer
kubectl logs deployment/log-output-dep -c log-output-reader
kubectl logs deployment/ping-pong-dep
```

Browser:

```text
http://localhost:8081/pingpong
http://localhost:8081/logoutput
```