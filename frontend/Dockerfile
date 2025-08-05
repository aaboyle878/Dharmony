# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

ARG VITE_GOVTOOL_URL
ENV VITE_GOVTOOL_URL=${VITE_GOVTOOL_URL}
COPY package.json package-lock.json ./
RUN npm ci


COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy a custom nginx config if you want (optional)
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
