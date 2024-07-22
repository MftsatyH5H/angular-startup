#http-server
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

FROM node:alpine
WORKDIR /app
COPY --from=node /app/dist/angular-startup /app
RUN npm install -g http-server

EXPOSE 8080

CMD ["http-server", "-p", "8080", "-g", "true"]

#nginx

#stage 1
# FROM node:latest as node
# WORKDIR /app
# COPY . .
# RUN npm install
# RUN npm run build --prod
# #stage 2
# FROM nginx:alpine
# COPY --from=node /app/dist/dbms /usr/share/nginx/html