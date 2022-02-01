FROM node:16-alpine3.14 as builder

WORKDIR '/app'
RUN npm install --global pm2

COPY package.json .
RUN npm install
COPY . .

RUN npm run build
EXPOSE 3000

USER node
CMD [ "pm2-runtime", "npm", "--", "start" ]
