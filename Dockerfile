FROM node:18-alpine
WORKDIR /app

COPY . /app/
RUN yarn && yarn cache clean
RUN yarn run prisma generate && yarn workspaces run build
