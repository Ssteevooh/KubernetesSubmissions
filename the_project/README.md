# The project

## Exercise 2.2. The project, step 8

```bash
docker exec k3d-k3s-default-agent-0 mkdir -p /tmp/kube
kubectl apply -f manifests/persistentvolume.yaml
kubectl apply -f manifests/persistentvolumeclaim.yaml

cd todo_backend
docker build -t ssteevooh/todo_backend:2.2 .
docker push ssteevooh/todo_backend:2.2
kubectl apply -f manifests
kubectl delete pod -l app=todo-backend

cd ../the_project
docker build -t ssteevooh/the_project:2.2 .
docker push ssteevooh/the_project:2.2
kubectl apply -f manifests
kubectl delete pod -l app=theproject

kubectl get pods
kubectl get svc,ing
kubectl get pv,pvc
kubectl logs deployment/todo-backend-dep
kubectl logs deployment/the-project-dep
```

Browser:

```text
http://localhost:8081/theproject
```