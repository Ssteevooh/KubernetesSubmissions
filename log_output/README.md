# Log output

## Exercise 3.2. Back to Ingress

```bash
gcloud container clusters get-credentials dwk-cluster --zone=europe-north1-b

cd ping_pong
docker build -t ssteevooh/ping_pong:3.2 .
docker push ssteevooh/ping_pong:3.2

cd ../log_output
docker build -t ssteevooh/log_output_writer:3.2 ./writer
docker push ssteevooh/log_output_writer:3.2

docker build -t ssteevooh/log_output_reader:3.2 ./reader
docker push ssteevooh/log_output_reader:3.2

cd ..
kubectl create namespace exercises

kubectl apply -f ping_pong/manifests/postgres.yaml
kubectl apply -f ping_pong/manifests/deployment.yaml
kubectl apply -f ping_pong/manifests/service.yaml

kubectl apply -f log_output/manifests/configmap.yaml
kubectl apply -f log_output/manifests/deployment.yaml
kubectl apply -f log_output/manifests/service.yaml

kubectl apply -f manifests/ingress.yaml

kubectl get pods -n exercises
kubectl get svc -n exercises
kubectl get ing -n exercises
```

Browser:

```text
http://ADDRESS/pingpong
http://ADDRESS/logoutput
```
