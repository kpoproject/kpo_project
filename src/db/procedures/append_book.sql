CREATE OR REPLACE PROCEDURE append_book(uid INTEGER, book INTEGER) LANGUAGE plpgsql AS $$
-- DECLARE
--   user_collection INTEGER;
  BEGIN
    -- SELECT u.collection_id INTO user_collection FROM users u WHERE u.id = uid;
    INSERT INTO collection_entry (collection_id, book_id) VALUES (uid, book);
    UPDATE users SET book_count = book_count + 1 WHERE id = uid;

  COMMIT;
  END;
  $$;

CREATE OR REPLACE PROCEDURE remove_book(uid INTEGER, book INTEGER) LANGUAGE plpgsql AS $$
-- DECLARE
--   user_collection INTEGER;
  BEGIN
    -- SELECT u.collection_id INTO user_collection FROM users u WHERE u.id = uid;
    DELETE FROM collection_entry WHERE collection_id = uid AND book_id = book;
    UPDATE users SET book_count = book_count - 1 WHERE id = uid;
  COMMIT;
  END;
  $$;

