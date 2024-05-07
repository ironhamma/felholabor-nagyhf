# Use the official Node.js image as base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files into the container
COPY backend/package*.json /app

# Install dependencies
RUN npm install

ENV DETECTION_HOST=localhost
ENV DB_HOST=localhost
ENV DB_NAME=labor-db
ENV DB_USER=benedek
ENV DB_PASSWORD=benedek
ENV MQ_HOST=localhost
ENV MAIL_USER=
ENV MAIL_PASS=

# Copy the rest of the application files into the container
COPY backend /app

# Expose the port that the Node.js server runs on
EXPOSE 5000

# Command to run the Node.js server
CMD ["node", "server.js"]