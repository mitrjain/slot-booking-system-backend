# Use the official Node.js image as the base image
FROM node:21

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
COPY package-lock.json ./

# Install app dependencies
RUN npm ci

# Copy the rest of the application code to the working directory
COPY *.js .

# Expose the port that the app will run on
EXPOSE 8080

# Start the app
CMD ["npm", "start"]