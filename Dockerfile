FROM node:16.16.0-alpine3.16 AS build

ARG GITHUB_TOKEN
ARG SENTRY_AUTH_TOKEN

ENV NODE_ENV="development"
ENV LOCALE_OVERRIDE="pt-BR"

WORKDIR /build

COPY ./package.json ./
COPY ./package-lock.json ./
COPY ./.npmrc ./
COPY ./bin ./bin
RUN npm ci

COPY . ./

RUN npm run build

FROM node:16.16.0-alpine3.16 AS final

ENV NODE_ENV="production"

WORKDIR /usr/app

COPY --from=build /build/package.json ./
COPY --from=build /build/package-lock.json ./

RUN npm i next

COPY --from=build /build/compiled-lang compiled-lang
COPY --from=build /build/public public
COPY --from=build /build/next.config.js .
COPY --from=build /build/.next .next

CMD [ "npm", "start" ]
