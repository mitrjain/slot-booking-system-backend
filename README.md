# Student Tutor Appointment Booking System

## Overall prerequisites
Before running this project, ensure you have the following installed:
- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Architecture diagrams

### Interaction of microservices
![sbs](https://github.com/mitrjain/slot-booking-system-backend/assets/26086412/02063bea-9eff-4e3a-9255-aa581862241b)

### Deployment as containerized microservices
![sbs_docker drawio](https://github.com/mitrjain/slot-booking-system-backend/assets/26086412/c5dd9ce1-4a59-4a07-b9fd-67e7da6f8c63)


## Overall code organization/ directory structure

```plaintext
student-tutor-booking-system/
├── docker/
│   ├── env-sbs-base-service-sample -> env file for the microservice:            sbs-base-service
│   ├── env-sbs-db-sample -> env file for the database:                          sbs-db-service
│   ├── env-sbs-frontend-sample -> env file for the microservice:                sbs-frontend-service
│   ├── env-sbs-notification-service-sample -> env file for the microservice:    sbs-notification-service
│   ├── env-sbs-update-gsheets-service-sample -> env file for the microservice:  sbs-gsheets-service
│   ├── sbs-compose.yaml -> docker compose file that configures the microservices and their dependencies
├── kubernetes/
│   ├── deploy.sh -> shell script that deploys all of the kubernetes components into a kubernetes cluster: ConfigMap, Secret, Deployments, Services, StatefulSets, etc .
│   ├── sbs-base-service.yaml -> Defines the Deployment and Service components for the microservice: sbs-base-service
│   ├── sbs-db.yaml -> Defines the Deployment and Service components for the database
│   ├── sbs-notification-service.yaml -> Defines the Deployment and Service components for the microservice: sbs-notification-service
│   ├── sbs-update-gsheets-service.yaml -> Defines the Deployment and Service components for the microservice: sbs-gsheets-service
├── README.md
```

## Running the application
###  On a cloud compute instance via Docker
1. **Clone the repository:**
    ```bash
    git clone https://github.com/mitrjain/slot-booking-system-backend.git
    cd slot-booking-system-backend/docker/
    ```

2. **Ensure you have the necessary environment files:**
   - Using the env-service_name-sample files create the following environment files in the docker dir: 
     - `env-sbs-db`
     - `env-sbs-notification-service`
     - `env-sbs-update-gsheets-service`
     - `env-sbs-base-service`
     - `env-sbs-frontend`

3. **Build and start the services:**
    ```bash
    docker-compose -f sbs-compose.yaml up --build
    ```

###  On a Kubernetes cluster
1. **Set up a kubernetes cluster on the cloud (EKS, GCP) or on your local machne (using minikube)**
2. **Configure the kubeconfig cli utility to interact with the cluster set up in the previous step**
3.**Clone the repository:**
    ```bash
    git clone https://github.com/mitrjain/slot-booking-system-backend.git
    cd slot-booking-system-backend/kubernetes/
    ```
4. **Ensure you have the necessary environment files:**
   - Using the sbs-config-sample and sbs-secret-sample files create the following environment files in the kubernetes dir: 
     - `sbs-config`
     - `sbs-secret`

5. **Create required Kubernetes components of all the microservices and the database in the Kubernetes cluster:**
    ```bash
    ./deploy.sh
    ```
## Links to source code of microservices
- sbs-db-service: [https://github.com/mitrjain/sbs-db-service](https://github.com/mitrjain/sbs-db-service)
- sbs-gsheets-service: [https://github.com/mitrjain/sbs-gsheets-service](https://github.com/mitrjain/sbs-gsheets-service)
- sbs-notification-service: [https://github.com/mitrjain/sbs-notification-service](https://github.com/mitrjain/sbs-notification-service)
- micro-frontend: [https://github.com/adil-ansari/student-booking-system](https://github.com/adil-ansari/student-booking-system)
