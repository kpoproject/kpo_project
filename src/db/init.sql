CREATE DATABASE libralib;

\c libralib;

CREATE TABLE users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username CHAR(256) UNIQUE NOT NULL,
  password CHAR(256) NOT NULL,
  book_count INTEGER DEFAULT 0
);

CREATE TABLE collection_entry (
  collection_id INTEGER NOT NULL,
  cover_i INTEGER NOT NULL,
  first_year_publish SMALLINT NOT NULL,
  key text NOT NULL,
  language CHAR(3)[] NOT NULL,
  title text NOT NULL,
  UNIQUE (collection_id, key)
);


ALTER TABLE collection_entry ADD CONSTRAINT fk_collection_id FOREIGN KEY (collection_id) REFERENCES users (id) ON DELETE CASCADE;

CREATE OR REPLACE PROCEDURE append_book(uid INTEGER, pswd text, cov INTEGER, fyp SMALLINT, k text, lang CHAR(3)[], t text) LANGUAGE plpgsql AS $$
  BEGIN
    IF (NOT verify_user_identity(uid, pswd)) THEN
      RAISE EXCEPTION 'Bad auth token';
    END IF;

    INSERT INTO collection_entry (collection_id, cover_i, first_year_publish, key, language, title) VALUES (uid, cov, fyp, k, lang, t);
    UPDATE users SET book_count = book_count + 1 WHERE id = uid;

  COMMIT;
  END;
  $$;

CREATE OR REPLACE PROCEDURE remove_book(uid INTEGER, pswd text, k text) LANGUAGE plpgsql AS $$
  BEGIN
    IF (NOT verify_user_identity(uid, pswd)) THEN
      RAISE EXCEPTION 'Bad auth token';
    END IF;

    DELETE FROM collection_entry WHERE collection_id = uid AND key = k;
    UPDATE users SET book_count = book_count - 1 WHERE id = uid;
  COMMIT;
  END;
  $$;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE OR REPLACE FUNCTION hash_string(string text)
RETURNS CHAR(256)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN encode(digest(string, 'sha256'), 'hex');
END;
$$;

CREATE OR REPLACE FUNCTION verify_user_identity(uid INTEGER, passwordrhs text)
RETURNS bool
LANGUAGE plpgsql
AS
$$
BEGIN
  RETURN EXISTS(SELECT 1 FROM users WHERE id = uid AND password = hash_string(passwordrhs));
END;
$$;
