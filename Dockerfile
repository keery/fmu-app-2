FROM node:8

# Create app directory
WORKDIR usr/app

# install node modules
COPY package.json /usr/app/package.json
RUN  cd /usr/app && npm install && npm start

# # install application
# COPY . /usr/app