FROM node:18-alpine as base

RUN curl -fsSL https://bun.sh/install | bash

ENV PATH="/root/.bun/bin:$PATH"
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0

FROM base as builder

WORKDIR /home/node/app
COPY package*.json ./

COPY . .
RUN bun install
RUN bun build

FROM base as runtime

ENV NODE_ENV=production

WORKDIR /home/node/app
COPY package*.json  ./
COPY yarn.lock ./

RUN bun install --production

EXPOSE 3000

CMD ["node", "dist/server.js"]
