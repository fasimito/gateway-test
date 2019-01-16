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

If you are lucky, you can start all the container and all the web microservices could register on the consul center in a single server.
Maybe you should feel Puzzled, why not make sure for 100 percent. let me show you some logs in the registrator container.
```
2019-01-11T07:10:09.632Z dev:discovery consul server connecting...
2019-01-11T07:10:09.697Z koa-router defined route HEAD,GET /microservice-gate/microservice-web/getServerIp
2019-01-11T07:10:09.706Z koa:application listen
2019-01-11T07:10:09.709Z koa:application use dispatch
2019-01-11T07:10:09.709Z koa:application use -
2019-01-11T07:10:09.725Z dev:app Server running at 3000
2019-01-11T07:10:09.993Z dev:watch consul server connecting...
2019-01-11T07:10:10.084Z dev:watch Listen Service: microservice-web error, the errors ：Error: No cluster leader
2019-01-11T07:10:10.306Z dev:watch Listen Service: microservice-web error, the errors ：Error: No cluster leader
2019-01-11T07:10:10.739Z dev:watch Listen Service: microservice-web error, the errors ：Error: No cluster leader
2019-01-11T07:10:11.572Z dev:watch Listen Service: microservice-web error, the errors ：Error: No cluster leader
2019-01-11T07:10:13.178Z dev:watch Listen Service: microservice-web contents changed ：{"name":"microservice-web","data":[{"Node":"consulserver","Address":"172.20.0.3","ServiceID":"registrator:node-microservice-gateway_serviceweb_1:3000","ServiceName":"microservice-web","ServiceTags":null,"ServiceAddress":"172.20.0.8","ServicePort":3000},{"Node":"consulserver","Address":"172.20.0.3","ServiceID":"registrator:node-microservice-gateway_serviceweb_2:3000","ServiceName":"microservice-web","ServiceTags":null,"ServiceAddress":"172.20.0.7","ServicePort":3000}]}

```
it's easy to understand why. in the process of competing for resources, some services will run out of time, thus losing re-registration. 
maybe this is a bug of the registrator, but it would not be appear on the online environment
because the online environment would not put all components together and they would be started separately.

##### (Painted Eggs)
```
error: SSL certificate problem: Invalid certificate chain while accessing https://githib.com/...XXXX.git fatal: HTTP request failed
solution: git config --global http.sslVerify false
```