#FROM node:14.9.0 As development

#WORKDIR /app

#COPY package.json ./

#RUN npm install
##COPY . .
#RUN npm run build
#CMD ["npm", "run", "start:prod"]

# Using Node:10 Image Since it contains all 
# the necessary build tools required for dependencies with native build (node-gyp, python, gcc, g++, make)
# First Stage : to install and build dependences

FROM node:14.9.0 AS builder
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build


# Second Stage : Setup command to run your app using lightweight node image
FROM node:14.9.0
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3000
CMD ["npm", "run", "start:prod"]