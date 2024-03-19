# Use the official Node.js image as base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files into the container
COPY . .

# Expose the port that the Node.js server runs on
EXPOSE 5000

# Command to run the Node.js server
CMD ["node", "server.js"]