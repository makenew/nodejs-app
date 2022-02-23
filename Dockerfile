FROM node:fermium-alpine as base

WORKDIR /usr/src/app

RUN apk add --no-cache \
      ca-certificates

RUN deluser --remove-home node \
 && addgroup -S node -g 10000 \
 && adduser -S -G node -u 10000 node

FROM base as preinstall

RUN apk add --no-cache jq
COPY package.json ./
RUN jq '.version="0.0.0"' package.json > package.json.tmp \
 && mv package.json.tmp package.json

FROM base as build

COPY . ./
RUN npm pack
RUN tar -xzf *.tgz

FROM base as install

COPY --from=build /usr/src/app/package/package-lock.json ./
COPY --from=preinstall /usr/src/app/package.json ./
RUN npm ci --production
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
