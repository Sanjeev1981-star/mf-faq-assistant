# Use official Node.js LTS image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install app dependencies (including dev dependencies for build)
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# Remove dev dependencies to reduce image size
RUN npm prune --production

# Expose the port
ENV PORT=3000
EXPOSE 3000

# Start the compiled app
CMD ["node", "dist/index.js"]
