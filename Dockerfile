FROM node:20-alpine

WORKDIR /app

ENV HOST=0.0.0.0
ENV WDS_SOCKET_HOST=localhost
ENV CHOKIDAR_USEPOLLING=true

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
