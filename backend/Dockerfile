FROM node:18-alpine
WORKDIR /app

# ✅ Copy only package.json first
COPY package*.json ./

# ✅ Install Alpine build tools + bcrypt build from source
RUN apk add --no-cache python3 make g++ \
    && npm install \
    && npm rebuild bcrypt --build-from-source \
    && apk del python3 make g++

# ✅ Now copy the rest of the backend code
COPY . .

EXPOSE 8000
CMD npx nodemon app.js
