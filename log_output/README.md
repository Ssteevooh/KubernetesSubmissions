# Log output

## Exercise 1.7. External access with Ingress

```bash
docker build -t ssteevooh/log_output:1.7 .
docker push ssteevooh/log_output:1.7
kubectl apply -f manifests
kubectl get pods
kubectl get svc,ing
kubectl logs deployment/log-output-dep
```

Browser:

```text
http://localhost:8081
```