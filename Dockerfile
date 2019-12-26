FROM node:9-slim
WORKDIR /app
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh
COPY package.json /app
RUN npm install
COPY . /app