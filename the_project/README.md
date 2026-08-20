# The project

## Exercise 3.6. The project, step 15

```bash
cd the_project
docker build -t europe-north1-docker.pkg.dev/dwk-gke-506008/my-repository/the_project:3.6 .
docker push europe-north1-docker.pkg.dev/dwk-gke-506008/my-repository/the_project:3.6

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
