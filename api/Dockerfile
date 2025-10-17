FROM node:20-slim

# Install fontconfig for font rendering (optional, but helps with text rendering)
RUN apt-get update && apt-get install -y \
    fontconfig \
    fonts-liberation \
    && fc-cache -fv \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy application files
COPY . .

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "banner.js"]
