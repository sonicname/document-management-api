FROM node:18-alpine

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm install -g @nestjs/cli

RUN npm install

COPY . /usr/src/app

RUN npm run build

RUN cd /usr/src/app/

CMD [ "node", "dist/main" ]

