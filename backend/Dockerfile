FROM node:16-alpine

#create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 3001
CMD [ "npm", "start" ] 
