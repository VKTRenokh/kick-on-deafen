FROM oven/bun:alpine as base
WORKDIR /usr/src/bot

FROM base AS installer
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev
RUN cd /temp/dev && bun install --frozen-lockfile

RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

FROM base as builder
COPY --from=installer /temp/dev/node_modules node_modules
COPY . .
RUN bun run build.ts

FROM base as runner
COPY --from=installer /temp/prod/node_modules node_modules
COPY --from=builder /usr/src/bot/dist/index.js .
COPY --from=builder /usr/src/bot/package.json .
ENTRYPOINT ["bun", "run", "index.js"]
