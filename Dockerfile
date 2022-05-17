FROM node as run

# ENV VARS
ENV npm_package_name=demo-app
ENV npm_package_version=1.0.0
ENV BACKEND_PATH="/api"
ENV DB_HOST=172.17.0.1
ENV DB_PORT=3306
ENV DB_USER=demoapp
ENV DB_PASSWORD=12345678
ENV DB_NAME=demoapp

WORKDIR /app
COPY . .
RUN npm install --prod

EXPOSE 3000
CMD node ./index.js
