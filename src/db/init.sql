CREATE DATABASE libralib;

\c libralib;
\i /create_tables.sql
\i /procedures/append_book.sql
\i /functions/verify_user.sql
\i /install_pgcrypto.sql
