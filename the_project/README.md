# The project

## Exercise 1.6. The project, step 4

```bash
docker build -t ssteevooh/the_project:1.5 .
docker push ssteevooh/the_project:1.5
k3d cluster delete
k3d cluster create --port 8082:30080@agent:0 -p 8081:80@loadbalancer --agents 2
kubectl apply -f manifests/deployment.yaml
kubectl apply -f manifests/service.yaml
kubectl get pods
kubectl get svc
```

Browser:

```text
http://localhost:8082
```