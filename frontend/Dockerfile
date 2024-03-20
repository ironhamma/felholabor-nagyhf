# Stage 1: Build the React app
FROM node:14 AS build

WORKDIR /app

# Copy package.json and package-lock.json files and install dependencies
COPY backend/package.json package-lock.json /app
RUN npm install

# Copy the rest of the application files
COPY backend /app

# Build the React app
RUN npm run build

# Stage 2: Serve the built React app using Nginx
FROM nginx:alpine

# Copy the built React app from the previous stage to the Nginx web root directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
