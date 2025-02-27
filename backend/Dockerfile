FROM node:current-alpine3.21 AS build

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY . .

RUN npx tsc


FROM node:current-alpine3.21 AS final

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist /usr/src/app/dist
COPY --from=build /usr/src/app/package*.json /usr/src/app/

RUN npm install --production

USER node

EXPOSE 3000

CMD ["npm", "run", "start"]
