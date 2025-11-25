#!/bin/bash

#root_dir="$(dirname $0)/.."
#sql_dir="$root_dir/sql"
DB_NAME="libralib"

set -e

/etc/init.d/postgresql start

echo "creating database..."
psql -f create_db.sql

echo "doing setup of database..."
psql -d ${DB_NAME} -f create_tables.sql -f set_connections.sql -f $sql_dir/procedures/append_book.sql
