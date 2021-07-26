# Pull latest official node image
FROM node:latest

# Expose ports, 35729 is port for hot reload page
EXPOSE 3000
EXPOSE 35729

# Set working directory
WORKDIR /app

# Add /app/node_modules/.bin to environment variables
ENV PATH /app/node_modules/.bin:$PATH

# Copy package files and install app dependencies
COPY package.json /app/
RUN npm install --production
RUN npm install react-scripts --production

# Add React app to working directory
ADD . /app

# permission
RUN chmod 777 node_modules

# Start the React app
CMD ["npm", "start"]
