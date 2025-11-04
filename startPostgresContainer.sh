#!/bin/bash

containerName="some-postgres"

docker run --name ${containerName} -e POSTGRES_PASSWORD=mysecretpassword -d postgres
docker exec ${containerName} psql -U postgres -f src/backend/sql/create_db.sql
docker exec ${containerName} psql -U postgres -f src/backend/sql/create_tables.sql
