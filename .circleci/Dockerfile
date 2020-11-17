FROM node:fermium-alpine as base

WORKDIR /usr/src/app

RUN apk add --no-cache \
      ca-certificates

FROM base as install

ARG NPM_TOKEN

COPY package/package.json.tmp ./package.json
COPY package/yarn.lock ./
RUN echo '//registry.npmjs.org/:_authToken=${NPM_TOKEN}' > .npmrc
RUN yarn install --production --pure-lockfile
RUN rm -f .npmrc
COPY package .
RUN rm -f package.json.tmp

FROM base

COPY --from=install /usr/src/app .
COPY package/package.json .

ENV NODE_ENV=production \
    PORT=8080

EXPOSE 8080

ENTRYPOINT ["node"]

CMD ["server.js"]

USER node
