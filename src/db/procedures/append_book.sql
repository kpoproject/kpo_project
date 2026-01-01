CREATE OR REPLACE PROCEDURE append_book(uid INTEGER, pswd text, cov INTEGER, fyp SMALLINT, k text, lang CHAR(3)[], t text) LANGUAGE plpgsql AS $$
  BEGIN
    IF (NOT verify_user_idedtity(uid, pswd)) THEN
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

