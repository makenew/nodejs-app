FROM node:fermium-alpine as base

WORKDIR /usr/src/app

RUN apk add --no-cache \
      ca-certificates

FROM base as build

COPY . ./
RUN yarn pack
RUN tar -xzf *.tgz

FROM base as install

COPY --from=build /usr/src/app/package/package.json ./usr/src/app/package/yarn.lock ./
RUN yarn install --production --pure-lockfile
COPY --from=build /usr/src/app/package .

FROM base

COPY --from=install /usr/src/app .

ENV NODE_ENV=production \
    PORT=8080

EXPOSE 8080

ENTRYPOINT ["node"]

CMD ["server.js"]

USER node

LABEL org.opencontainers.image.source https://github.com/makenew/nodejs-app
