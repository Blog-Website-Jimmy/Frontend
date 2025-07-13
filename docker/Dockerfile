FROM nginx:1.22.0-alpine

# Copy built SPA files to nginx html directory
COPY dist/spa /usr/share/nginx/html

# Overwrite default nginx config with your own
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
