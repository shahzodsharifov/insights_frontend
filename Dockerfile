# Use a Node.js base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm ci --production

# Copy the rest of the application files to the container
COPY . .

# Set the command to start the SolidJS application
CMD ["sh", "-c", "npm start -- --port $PORT --host 0.0.0.0"]
