# The project

## Exercise 2.6. The project, step 10

```bash
kubectl create namespace project

docker exec k3d-k3s-default-agent-0 mkdir -p /tmp/kube

kubectl apply -f manifests/persistentvolume.yaml
kubectl apply -f manifests/persistentvolumeclaim.yaml

cd todo_backend
docker build -t ssteevooh/todo_backend:2.6 .
docker push ssteevooh/todo_backend:2.6

cd ../the_project
docker build -t ssteevooh/the_project:2.6 .
docker push ssteevooh/the_project:2.6

cd ..
kubectl apply -f todo_backend/manifests
kubectl apply -f the_project/manifests

kubectl delete pod -l app=todo-backend -n project
kubectl delete pod -l app=theproject -n project

kubectl get all -n project
kubectl get configmap -n project
kubectl get ing -n project
kubectl get pvc -n project
kubectl get pv
```

Browser:

```text
http://localhost:8081/theproject
```
