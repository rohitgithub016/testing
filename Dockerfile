# Use the official Node.js 21.1.0 image as the base image
FROM node:21.1.0

# Set the working directory inside the container to /app
WORKDIR /app

# Copy package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies specified in package.json
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose port 4173, which is typically used for the Vite preview server
EXPOSE 4173

# Build the project (typically for production)
RUN npm run build

# Run the Vite preview server to serve the built project
RUN npm run preview

