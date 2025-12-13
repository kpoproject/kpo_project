FROM postgres:latest
##COPY init.sql /docker-entrypoint-initdb.d/
#
##ENV POSTGRES_USER=libralib_admin
##ENV POSTGRES_PASSWORD=docker
##ENV POSTGRES_DB=libralib
#
#COPY . .
#WORKDIR /db
#CMD ["psql", "-U postgres -f init.sql"]

COPY . .
COPY init.sql /docker-entrypoint-initdb.d/
USER root
RUN chown postgres:postgres /docker-entrypoint-initdb.d/init.sql
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["postgres"]
