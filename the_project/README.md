# The project

## Exercise 1.12. The project, step 6

```bash
docker exec k3d-k3s-default-agent-0 mkdir -p /tmp/kube
kubectl apply -f manifests/persistentvolume.yaml
kubectl apply -f manifests/persistentvolumeclaim.yaml

cd the_project
docker build -t ssteevooh/the_project:1.12 .
k3d image import ssteevooh/the_project:1.12
kubectl apply -f manifests
kubectl get pods
kubectl get svc,ing
kubectl get pv,pvc
kubectl logs deployment/the-project-dep
```

Browser:

```text
http://localhost:8081/theproject
```