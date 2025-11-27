FROM postgres:latest
COPY init.sql /docker-entrypoint-initdb.d/

#ENV POSTGRES_USER=libralib_admin
ENV POSTGRES_PASSWORD=docker
#ENV POSTGRES_DB=libralib

#COPY . .
WORKDIR /db
