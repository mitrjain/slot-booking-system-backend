#! /bin/bash

echo "Deleting existing deployments and services:"
echo "--Executing: kubectl delete all --all"
kubectl delete all --all

echo "Creating Config Map"
echo "--Executing: kubectl apply -f ./sbs-config.yaml"
kubectl apply -f ./sbs-config.yaml

echo "Creating Secret"
echo "--Executing: kubectl apply -f ./sss-secret.yaml"
kubectl apply -f ./sbs-secret.yaml

echo "Creating Database Deployment and Service"
echo "--Executing: kubectl apply -f ./sbs-db.yaml"
kubectl  apply -f ./sbs-db.yaml

echo "Creating GSheets service Deployment and Service"
echo "--Executing: kubectl apply -f ./sbs-update-gsheets-service.yaml"
kubectl apply -f ./sbs-update-gsheets-service.yaml

echo "Creating Notifications Deployment and Service"
echo "--Executing: kubectl apply -f ./sbs-notification-service.yaml"
kubectl apply -f ./sbs-notification-service.yaml 

echo "Creating Base Deployment and Service"
echo "--Executing: kubectl apply -f ./sbs-base-service.yaml"
kubectl apply -f ./sbs-base-service.yaml

