FROM node

WORKDIR /app

COPY . .

RUN npm install

CMD [ "npm", "run", "dev" ]

EXPOSE 3000