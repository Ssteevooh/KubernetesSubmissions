# The project

## Exercise 1.5. The project, step 3

```bash
docker build -t ssteevooh/the_project:1.5 .
docker push ssteevooh/the_project:1.5
k3d cluster start
kubectl apply -f manifests/deployment.yaml
kubectl get pods
kubectl port-forward deployment/the-project 3003:3000
kubectl logs deployment/the-project
```