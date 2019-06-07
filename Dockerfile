FROM node:slim

RUN npm i -g @angular/cli
COPY . /usr/app
WORKDIR /usr/app
RUN npm i
CMD ["npm", "start"]