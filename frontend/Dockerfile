FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3000"]

EXPOSE 3000


# Stage 1: React build stage
# FROM node:18-alpine as build
# WORKDIR /app
# COPY package*.json 
# RUN npm install
# COPY . .
# RUN npm run build

# # Stage 2: Nginx serve stage
# FROM nginx:alpine
# COPY --from=build /app/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

