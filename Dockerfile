FROM node:14.4.0-stretch

EXPOSE 8001

RUN date >/build-date.txt
RUN npm install yarn

ENTRYPOINT ["bash", "yarn start"]
