FROM python:3.7-slim-stretch

RUN apt-get update
 
EXPOSE 8001

RUN date >/build-date.txt

ENTRYPOINT ["bash", "npm start"]
