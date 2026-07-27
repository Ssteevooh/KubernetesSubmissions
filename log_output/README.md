# Log output

## Exercise 1.1. Getting started

```bash
docker build -t ssteevooh/log_output:1.1 .
docker push ssteevooh/log_output:1.1
k3d cluster create -a 2
k3d cluster start
kubectl create deployment log-output --image=ssteevooh/log_output:1.1
kubectl get pods
kubectl logs deployment/log-output
```