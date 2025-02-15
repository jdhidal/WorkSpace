FROM node:20

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --legacy-peer-deps
COPY . .

EXPOSE 3012
CMD ["node", "server.js"]
