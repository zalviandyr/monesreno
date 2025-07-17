FROM node:alpine AS build
WORKDIR /app

COPY . .

RUN npm i
RUN npm run build

FROM node:alpine
WORKDIR /app

COPY --from=build /app/build/ build
COPY --from=build /app/dist/ dist

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY .env.docker .env

RUN npm install --omit=dev

EXPOSE 9000
CMD [ "node", "dist/server" ]
