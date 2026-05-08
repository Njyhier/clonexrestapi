FROM node:24.9.0

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

ARG DATABASE_URL
ARG PORT
ARG SECRET_KEY

ENV DATABASE_URL=$DATABASE_URL
ENV PORT=$PORT
ENV SECRET_KEY=$SECRET_KEY

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD [ "node", "./dist/index.js" ]