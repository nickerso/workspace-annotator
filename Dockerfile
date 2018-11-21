FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY . .

# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN yarn
RUN yarn build

# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
#COPY server.js .

EXPOSE 8080
CMD [ "npm", "start" ]