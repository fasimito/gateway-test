# node-microservice-gateway

This project is used for create a gateway to discovery and manage the microservice on the registry center.

If you want to run this project, you must run the node-microservice-web as service provider.

## Step 1: Make Docker Image

please make sure the node-microservice-web image had been built, because it's the service headstream. 

it's easy to build the gateway image, run the fellow command:
>docker build -t fasimito/node-microservice-gateway .

## Step 2: Run the Docker-compose

start the docker compose to create the container, the contents in the file would not be expose here.

>docker-compose up -d --scale serviceweb=3




