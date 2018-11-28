FROM node:9

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .