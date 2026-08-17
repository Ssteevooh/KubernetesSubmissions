# Todo backend

## Exercise 2.10. The project, step 13

```bash
kubectl create namespace project

docker exec k3d-k3s-default-agent-0 mkdir -p /tmp/kube

kubectl apply -f manifests/persistentvolume.yaml
kubectl apply -f manifests/persistentvolumeclaim.yaml

cd todo_backend
docker build -t ssteevooh/todo_backend:2.10 .
docker push ssteevooh/todo_backend:2.10

cd ..
kubectl apply -f todo_backend/manifests
kubectl apply -f the_project/manifests

kubectl delete pod -l app=todo-backend -n project

kubectl get all -n project
kubectl get pvc -n project
kubectl get configmap -n project
kubectl get secret -n project
kubectl get cronjob -n project
kubectl get ing -n project
```

Test todo:

```bash
curl -X POST http://localhost:8081/theproject/todos \
  -d "todo=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
```

Logs:

```bash
kubectl logs -l app=todo-backend -n project
```

Monitoring:

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update

kubectl create namespace monitoring

helm upgrade --install prom prometheus-community/prometheus \
  --namespace monitoring \
  --create-namespace \
  --values prom-values.yaml

helm upgrade --install loki grafana/loki \
  --namespace monitoring \
  --values loki-values.yaml

helm upgrade --install k8smon grafana/k8s-monitoring \
  --namespace monitoring \
  --values k8smon-values.yaml

helm upgrade --install grafana grafana/grafana \
  --namespace monitoring \
  --values grafana-values.yaml
```

Check monitoring:

```bash
helm list --namespace monitoring
kubectl get svc --namespace monitoring
kubectl get pods --namespace monitoring
```

Grafana:

```bash
kubectl port-forward --namespace monitoring svc/grafana 3000:80
```

```text
http://localhost:3000
```

Loki:

```text
{namespace="project"} |= "Todo"
```

Browser:

```text
http://localhost:8081/theproject
```
