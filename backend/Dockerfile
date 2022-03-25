FROM node:16

WORKDIR /app

RUN npm i -g @nestjs/cli
COPY package.json .
RUN npm install
COPY . .
