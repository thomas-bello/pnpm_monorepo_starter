FROM node:14.19.3-alpine AS build

WORKDIR /src


RUN npm install -g pnpm

COPY . /src
RUN pnpm install
RUN pnpm build


FROM nginx:1.16.1

COPY --from=build /src/apps/vite-vue2-starter/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /src/apps/vite-vue2-starter/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /src/apps/vite-vue2-starter/dist /src/dist
EXPOSE 80

ENV TZ Asia/Shanghai