FROM node:16-alpine3.14

WORKDIR '/app'
RUN npm install --global pm2

COPY package.json .
RUN npm install

COPY . .
EXPOSE 5000

USER node
CMD [ "pm2-runtime", "npm", "--", "start" ]