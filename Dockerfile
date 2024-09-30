FROM node:18-alpine

WORKDIR /app
COPY package*.json ./

ARG REVDEBUG_SERVER_HOSTNAME_COMMAND

RUN npm config set @revdebug:registry https://nexus.revdebug.com/repository/npm/
RUN npm install
RUN npm install @revdebug/revdebug

COPY . .
EXPOSE 3000 
RUN npx revd ${REVDEBUG_SERVER_HOSTNAME_COMMAND}

CMD ["npm", "start"]
