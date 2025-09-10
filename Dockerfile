FROM node:22.17.1-alpine AS build
# Set working directory
WORKDIR /app
# Copy package.json and package-lock.json
COPY package*.json ./
# Install dependencies
RUN npm install --force
# Copy the rest of the application code
COPY . .
# Build the application
RUN npm run build
# Stage 2: Serve the application
FROM nginx:alpine

COPY --from=build /app/dist /var/www/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY env.sh /docker-entrypoint.d/env.sh

RUN chmod +x /docker-entrypoint.d/env.sh