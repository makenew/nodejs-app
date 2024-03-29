FROM node:hydrogen-alpine as base

WORKDIR /usr/src/app

RUN apk add --no-cache \
      ca-certificates

RUN deluser --remove-home node \
 && addgroup -S node -g 10000 \
 && adduser -S -G node -u 10000 node

FROM base as build

COPY . ./
RUN npm pack
RUN tar -xzf *.tgz

FROM base as install

ENV NODE_ENV=production

COPY package-lock.json ./
COPY package.json ./
RUN --mount=type=cache,target=/root/.npm npm ci

FROM base as app

COPY --from=install /usr/src/app .
COPY --from=build /usr/src/app/package .

ENV NODE_ENV=production \
    PORT=8080

EXPOSE 8080

ENTRYPOINT ["node"]

CMD ["server.js"]

USER node

LABEL org.opencontainers.image.source https://github.com/makenew/nodejs-app
