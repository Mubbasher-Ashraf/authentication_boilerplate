# Use the official Node.js Alpine image.
FROM node:20-alpine

# Create the app directory and change its ownership to the node user.
RUN mkdir -p /usr/src/node-app && chown -R node:node /usr/src/node-app

# Set the working directory.
WORKDIR /usr/src/node-app

# Copy the package.json and yarn.lock files and install dependencies.
COPY package.json package-lock.json ./

# Switch to the node user for better security.
USER node

# Install dependencies.
RUN yarn install --pure-lockfile
RUN npm install pm2 -g

# Copy the application code and set ownership to the node user.
COPY --chown=node:node . .

# Default environment variables
ENV SERVER_PORT=3000


# Expose the port defined by the PORT environment variable.
EXPOSE ${SERVER_PORT}

# The command to run the application.
CMD ["pm2-runtime", "ecosystem.config.js", "--watch"]
