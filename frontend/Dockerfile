FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Build production files
COPY . .
RUN npm run build

# Serve with a simple HTTP server
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3001"]

EXPOSE 3001

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

