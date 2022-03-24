FROM node:16

ENV NODE_ENV=production

WORKDIR /app

COPY package.json .
COPY package-lock.json .
COPY frontend/package.json .
COPY frontend/package-lock.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start"]