CREATE DATABASE libralib;

\c libralib;

CREATE TABLE users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username CHAR(64) UNIQUE NOT NULL,
  password CHAR(64) NOT NULL,
  book_count INTEGER DEFAULT 0
);

CREATE TABLE collection_entry (
  id INTEGER GENERATED ALWAYS AS IDENTITY,
  collection_id INTEGER NOT NULL,
  book_id INTEGER NOT NULL,
  UNIQUE (collection_id, book_id)
);

ALTER TABLE collection_entry ADD CONSTRAINT fk_collection_id FOREIGN KEY (collection_id) REFERENCES users (id) ON DELETE CASCADE;
