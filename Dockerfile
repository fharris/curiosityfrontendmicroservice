# pull official base image
FROM node:13.12.0-alpine
#FROM alpine:3.14

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
ENV REACT_APP_MY_VAR fernando.harris
ENV REACT_APP_SERVER_CURIOSITY_IP localhost

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN apk --no-cache add curl
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . ./

# start app
CMD ["npm", "start"]
