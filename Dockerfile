FROM node:10

# install simple http server for serving static content
RUN npm install -g http-server

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY  --chown=daemon . /app  

WORKDIR /app/

ARG ENV
ARG PORT
ENV PORT=$PORT

ENV BASE_URL ${ENV}

# install project dependencies
RUN npm install

# build app for production with minification
RUN npm run build

# Make port 80 available to the world outside this container
EXPOSE ${PORT}

RUN echo ${BASE_URL}

# Muda o usuário
USER daemon

ENTRYPOINT http-server dist -p ${PORT}
