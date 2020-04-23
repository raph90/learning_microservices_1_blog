FROM node:alpine
# VERSION 6!!
WORKDIR /app
COPY package.json ./
RUN npm install 
COPY . .

CMD ["npm", "start"]