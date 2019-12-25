FROM node:9-slim
WORKDIR /app
COPY package.json /app
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh
RUN npm install
COPY . /app
CMD ["npm", "start"]