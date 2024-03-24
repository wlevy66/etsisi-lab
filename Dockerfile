FROM node:21

RUN mkdir -p /usr/src/etsisi
WORKDIR /usr/src/etsisi

COPY ./backend/. .

RUN "npm install"

COPY ./frontend/. .
RUN "npm install"



EXPOSE 3900

CMD [ "executable" ]