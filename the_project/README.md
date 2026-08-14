# The project

## Exercise 2.4. The project, step 9

```bash
kubectl create namespace project

kubectl apply -f manifests/persistentvolume.yaml
kubectl apply -f manifests/persistentvolumeclaim.yaml

kubectl apply -f todo_backend/manifests
kubectl apply -f the_project/manifests

kubectl get all -n project
kubectl get ing -n project
kubectl get pvc -n project
kubectl get pv
```

Browser:

```text
http://localhost:8081/theproject
```
