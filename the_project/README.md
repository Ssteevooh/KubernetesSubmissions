# The project

## Exercise 3.5. The project, step 14

```bash
cd the_project
docker build -t ssteevooh/the_project:3.5 .
docker push ssteevooh/the_project:3.5

cd ..
kubectl apply -k .

kubectl get pods -n project
kubectl get svc -n project
kubectl get pvc -n project
```

Browser:

```text
http://ADDRESS/theproject
```
