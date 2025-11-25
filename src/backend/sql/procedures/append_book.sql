CREATE OR REPLACE PROCEDURE append_book(uid users.id%TYPE, pswd text, book INTEGER) LANGUAGE plpgsql AS $$
  BEGIN
    IF (NOT verify_user_identity(uid, pswd)) THEN
      RAISE EXCEPTION 'Bad auth token';
    END IF;

    INSERT INTO collection_entry (collection_id, book_id) VALUES (uid, book);
    UPDATE users SET book_count = book_count + 1 WHERE id = uid;

  COMMIT;
  END;
  $$;

CREATE OR REPLACE PROCEDURE remove_book(uid users.id%TYPE, pswd text, book INTEGER) LANGUAGE plpgsql AS $$
  BEGIN
    IF (NOT verify_user_identity(uid, pswd)) THEN
      RAISE EXCEPTION 'Bad auth token';
    END IF;

    DELETE FROM collection_entry WHERE collection_id = uid AND book_id = book;
    UPDATE users SET book_count = book_count - 1 WHERE id = uid;
  COMMIT;
  END;
  $$;

