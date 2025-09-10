#!/bin/sh

# Environment configuration script for Docker container
# This script runs before nginx starts

# Set default environment variables if not provided
export API_BASE_URL=${API_BASE_URL:-"http://13.51.168.77:8080"}
export NODE_ENV=${NODE_ENV:-"production"}

# Replace environment variables in built files
if [ -f "/var/www/html/index.html" ]; then
    # Replace API_BASE_URL placeholder in index.html if it exists
    sed -i "s|__API_BASE_URL__|${API_BASE_URL}|g" /var/www/html/index.html
fi

# Replace environment variables in JavaScript files
find /var/www/html -name "*.js" -type f -exec sed -i "s|__API_BASE_URL__|${API_BASE_URL}|g" {} \;

echo "Environment configuration completed:"
echo "API_BASE_URL: ${API_BASE_URL}"
echo "NODE_ENV: ${NODE_ENV}"