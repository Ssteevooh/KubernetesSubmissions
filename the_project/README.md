# The project

## Exercise 1.2. The project, step 1

```bash
docker build -t ssteevooh/the_project:1.2 .
docker push ssteevooh/the_project:1.2
kubectl create deployment the-project --image=ssteevooh/the_project:1.2
kubectl get pods
kubectl logs deployment/the-project
```