FROM node:14-alpine
ENV NODE_ENV development
# Add a work directory

WORKDIR /app
# Cache and Install dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn install
# Copy app files
COPY . .
# Build the React app 
RUN npm run build
# Expose port
EXPOSE 3000
# Start the app
CMD [ "yarn", "start" ]