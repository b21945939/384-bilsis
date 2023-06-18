## build args
FROM node:16-alpine as build-deps

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

RUN npm start