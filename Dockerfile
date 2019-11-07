FROM node:10

# install simple http server for serving static content
RUN npm install -g http-server

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./app/

WORKDIR /app

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . /app

# build app for production with minification
RUN npm run build 

EXPOSE 8080

ENTRYPOINT [ "http-server", "dist"]   