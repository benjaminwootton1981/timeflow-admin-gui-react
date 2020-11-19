# timeflow-admin-gui-react

FROM node:14.15.1-alpine3.10

WORKDIR /react-app
COPY ./package.json ./
RUN npm install
COPY ./ ./
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/
EXPOSE 8001
COPY --from=0 /react-app/build /usr/share/nginx/html/

#Need to start NGINX by calling original entrypoint well, then this to replace variables....
#ENTRYPOINT ["bash", "entrypoint.sh"]
