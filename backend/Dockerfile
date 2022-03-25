FROM node:16

RUN mkdir /backend
WORKDIR /backend

COPY package.json .
RUN npm i -g @nestjs/cli
RUN npm install
COPY . .
