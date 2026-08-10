# Log output

## Exercise 1.10. Even more services

```bash
cd writer
docker build -t ssteevooh/log_output_writer:1.10 .
docker push ssteevooh/log_output_writer:1.10

cd ../reader
docker build -t ssteevooh/log_output_reader:1.10 .
docker push ssteevooh/log_output_reader:1.10

cd ..
kubectl apply -f manifests
kubectl get pods
kubectl get svc,ing
kubectl logs deployment/log-output-dep -c log-output-writer
kubectl logs deployment/log-output-dep -c log-output-reader
```

Browser:

```text
http://localhost:8081/logoutput
```