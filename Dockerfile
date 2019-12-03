FROM node:erbium-alpine as build

ARG NPM_TOKEN

RUN apk add --no-cache ca-certificates tar

WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN echo '//registry.npmjs.org/:_authToken=${NPM_TOKEN}' > .npmrc
RUN yarn install --pure-lockfile
RUN rm -f .npmrc
COPY . ./
RUN yarn run build \
 && yarn pack \
 && tar -xzf *.tgz

FROM node:erbium-alpine as install

ARG NPM_TOKEN

RUN apk add --no-cache ca-certificates

WORKDIR /usr/src/app
COPY --from=build /usr/src/app/package.json ./usr/src/app/yarn.lock ./
RUN echo '//registry.npmjs.org/:_authToken=${NPM_TOKEN}' > .npmrc
RUN yarn install --production --pure-lockfile
RUN rm -f .npmrc
COPY --from=build /usr/src/app .

FROM node:erbium-alpine

RUN apk add --no-cache ca-certificates

WORKDIR /usr/src/app
COPY --from=install /usr/src/app .

ENV NODE_ENV=production \
    PORT=8080

EXPOSE 8080

ENTRYPOINT ["node"]

CMD ["server.js"]

USER node
