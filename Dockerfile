FROM node:14-alpine AS base

WORKDIR /usr/src/app

COPY ./package* ./

RUN npm set progress=false && npm config set depth 0
RUN npm i --only=prod

COPY nest-cli.json ./
COPY tsconfig* ./
COPY env ./env
COPY .eslintrc.js ./.eslintrc.js
COPY shared ./shared

COPY apps /usr/apps

FROM node:14-alpine AS user
WORKDIR /usr/src/app
COPY --from=base /usr/src/app/ .
COPY --from=base /usr/apps/user ./apps/user
CMD ["npm","run","start:dev","user"]

