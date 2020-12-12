FROM node:15.2.1-alpine3.12

ENV NODE_ENV="production"

WORKDIR /usr/app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY dist dist
COPY .next .next
COPY compiled-lang compiled-lang
COPY public public
COPY next.config.js .

CMD [ "npm", "start" ]
