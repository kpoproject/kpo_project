#!/bin/bash

setup_dir="$(dirname $0)"
root_dir="$(dirname $0)/.."
db_name="libralib"

echo "creating database..."
sudo -u postgres psql -f $root_dir/db/create_db.sql

echo "doing setup of database..."
sudo -u postgres psql -d $db_name -f $root_dir/db/create_tables.sql -f $root_dir/db/set_connections.sql

cd "$root_dir"
npm install
