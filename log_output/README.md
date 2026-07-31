# Log output

## Exercise 1.3. Declarative approach

```bash
docker build -t ssteevooh/log_output:1.1 .
docker push ssteevooh/log_output:1.1
k3d cluster create -a 2
k3d cluster start
kubectl apply -f manifests/deployment.yaml
kubectl get pods
kubectl logs deployment/log-output
```