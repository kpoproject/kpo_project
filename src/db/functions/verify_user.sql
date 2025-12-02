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
