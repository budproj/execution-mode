FROM node:15.2.1-alpine3.12

ENV NODE_ENV="production"

WORKDIR /usr/app

COPY . .
RUN npm install

CMD [ "npm", "start" ]
