FROM node:18-alpine
WORKDIR /app

# ✅ Install dependencies first
COPY package*.json ./

# ✅ Install Alpine build tools + bcrypt build from source
RUN apk add --no-cache python3 make g++ \
    && npm install \
    && npm rebuild bcrypt --build-from-source \
    && apk del python3 make g++

# ✅ Copy the rest of the backend code
COPY . .

EXPOSE 8000
CMD ["node", "app.js"]
