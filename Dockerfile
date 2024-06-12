FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

RUN npx prisma generate

# Bundle app source
COPY . .

EXPOSE 3000


CMD [ "node", "index.js" ]