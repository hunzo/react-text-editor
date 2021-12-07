FROM node:12-alpine AS builder

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install --ignore-platform

COPY . .

RUN yarn build

# 2nd Stage
FROM nginx:alpine

COPY --from=0 /app/build /usr/share/nginx/html
COPY --from=0 /app/default.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
