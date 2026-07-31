# The project

## Exercise 1.4. The project, step2

```bash
docker build -t ssteevooh/the_project:1.2 .
docker push ssteevooh/the_project:1.2
k3d cluster start
kubectl apply -f manifests/deployment.yaml
kubectl get pods
kubectl logs deployment/the-project
```