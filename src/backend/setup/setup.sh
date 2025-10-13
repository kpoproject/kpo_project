#!/bin/bash

root_dir="$(dirname $0)/.."
sql_dir="$root_dir/sql"
db_name="libralib"

echo "creating database..."
sudo -u postgres psql -f $sql_dir/create_db.sql

echo "doing setup of database..."
sudo -u postgres psql -d $db_name -f $sql_dir/create_tables.sql -f $sql_dir/set_connections.sql

cd "$root_dir"
npm install
