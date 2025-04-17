# Development stage
FROM node:23-alpine3.20 AS development

WORKDIR /client
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "run", "dev"]

# Build stage
FROM node:23-alpine3.20 AS build

# Declare ARG again here!
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

WORKDIR /client
COPY package*.json ./
RUN npm install
COPY . .

# Use the variable in Vite build
RUN  npm run build

# Production stage
FROM nginx:alpine AS production

COPY --from=build /client/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
