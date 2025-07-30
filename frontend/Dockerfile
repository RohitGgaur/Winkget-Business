FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=3001          
EXPOSE 3001            
CMD ["npm", "start", "--", "--host", "0.0.0.0"]
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

