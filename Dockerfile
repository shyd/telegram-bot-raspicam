FROM node:12-buster-slim

ENV PATH="$PATH:/opt/vc/bin"

RUN echo "/opt/vc/lib" > /etc/ld.so.conf.d/00-vcms.conf

WORKDIR /usr/src/app

RUN mkdir photos
RUN mkdir videos

COPY . .
RUN npm install

CMD ldconfig && node app.js
