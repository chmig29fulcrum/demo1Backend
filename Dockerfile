FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

# Set environment variables
ENV PORT_DEVELOPMENT=4000
ENV PORT_PRODUCTION=5000
ENV DATABASE_DEVELOPMENT=mongodb://127.0.0.1:27017/n4
ENV DATABASE_PRODUCTION=mongodb://demo1-db/demo1
ENV JWT_SECRET=secret-word-for-natours-project-jwt-token
ENV JWT_EXPIRES_IN=90d
ENV JWT_COOKIE_EXPIRES_IN=90

EXPOSE 5000

CMD [ "npm", "run", "start:prod" ]
