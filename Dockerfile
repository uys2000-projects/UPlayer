FROM node:alpine

WORKDIR /app

RUN npm install -g http-server

COPY ./dist .

EXPOSE 8080
CMD [ "http-server", "." ]
