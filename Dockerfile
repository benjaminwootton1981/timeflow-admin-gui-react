FROM node:alpine
WORKDIR /react-app
COPY ./package.json ./
RUN npm install
COPY ./ ./
RUN npm run build
FROM nginx:alpine
EXPOSE 8001
COPY --from=0 /react-app/build /usr/share/nginx/html/
