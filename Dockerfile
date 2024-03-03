#########
# BUILD #
#########

FROM node:20-alpine As build

WORKDIR /app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY --chown=node:node ./package*.json .

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN npm ci

COPY --chown=node:node . .

# Set NODE_ENV environment variable
ENV NODE_ENV production

# Run the build command which creates the production bundle
RUN npm run build

USER node

##############
# PRODUCTION #
##############

FROM node:20-alpine As production

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /app/build /app/build

# Install serve to serve the app
RUN npm i -g serve

# Start the server using the production build
CMD [ "serve", "-s", "/app/build" ]