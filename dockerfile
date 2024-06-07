FROM node:lts-alpine as base

COPY package.json package-lock.json ./

RUN npm ci

COPY .  .

EXPOSE 3000


CMD ["npm", "run", "dev"]


