# Dockerfile
FROM node:12.16.0-alpine AS build
RUN mkdir /home/node/app && chown node:node /home/node/app
RUN mkdir /home/node/app/node_modules && chown node:node /home/node/app/node_modules
WORKDIR  /home/node/app
USER node
COPY --chown=node:node package.json package-lock.json ./
RUN npm install
COPY --chown=node:node . .
EXPOSE 4200 49153