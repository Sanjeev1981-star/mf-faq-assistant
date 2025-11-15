# Use official Node.js LTS image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Copy source and build
COPY . .
RUN npm run build

# Expose the port
ENV PORT=3000
EXPOSE 3000

# Start the compiled app
CMD ["node", "dist/index.js"]
