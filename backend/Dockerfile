FROM node:16

RUN mkdir /app
WORKDIR /app

COPY package.json .
RUN npm i -g @nestjs/cli
RUN npm install
COPY . .
