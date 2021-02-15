# pull official base image
FROM node:12.18.3-alpine


RUN apk --no-cache add --virtual builds-deps build-base python

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app


# set working directory
WORKDIR /home/node/app

# install app dependencies
COPY package.json ./

RUN yarn install
COPY . ./

EXPOSE 8081

CMD ["yarn", "dev"]
