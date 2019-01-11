FROM node:alpine
RUN mkdir -p /opt/data/
WORKDIR /opt/data
COPY . /opt/data
#RUN npm install -g cnpm --registry=http://r.cnpmjs.org
RUN npm install
EXPOSE 3000
CMD DEBUG=* npm start