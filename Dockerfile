FROM node:16

EXPOSE 4000

WORKDIR /src

ADD package.json /src

RUN npm i --silent

ADD . /src

RUN npm run build