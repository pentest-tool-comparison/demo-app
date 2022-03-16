FROM mysql as mysql
ENV MYSQL_RANDOM_ROOT_PASSWORD=yes
COPY ./sql/ /docker-entrypoint-initdb.d/