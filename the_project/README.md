# The project

## Exercise 1.8. The project, step 5

```bash
docker build -t ssteevooh/the_project:1.5 .
docker push ssteevooh/the_project:1.5
kubectl delete ingress log-output-ingress
kubectl apply -f manifests
kubectl get pods
kubectl get svc,ing
kubectl logs deployment/the-project-dep
```

Browser:

```text
http://localhost:8081
```