# Ping-pong

## Exercise 3.1. Pingpong GKE

```bash
gcloud container clusters create dwk-cluster \
  --zone=europe-north1-b \
  --cluster-version=1.36 \
  --disk-size=32 \
  --num-nodes=4 \
  --machine-type=e2-small

gcloud container clusters get-credentials dwk-cluster --zone=europe-north1-b

cd ping_pong
docker build -t ssteevooh/ping_pong:3.1 .
docker push ssteevooh/ping_pong:3.1

cd ..
kubectl create namespace exercises

kubectl apply -f ping_pong/manifests/postgres.yaml
kubectl apply -f ping_pong/manifests/deployment.yaml
kubectl apply -f ping_pong/manifests/service.yaml

kubectl get pods -n exercises
kubectl get svc -n exercises
```

Browser:

```text
http://EXTERNAL-IP/pingpong
```
