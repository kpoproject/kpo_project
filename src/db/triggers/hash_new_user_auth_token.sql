CREATE OR REPLACE FUNCTION hash_user_auth_token()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    IF tg_op = 'INSERT' OR tg_op = 'UPDATE' THEN
        NEW.username = hash_string(NEW.username::text);
        NEW.password = hash_string(NEW.password::text);
        RETURN NEW;
    END IF;
END;
$$;

CREATE OR REPLACE TRIGGER hash_auth_token_on_insert_update BEFORE INSERT OR UPDATE ON users FOR EACH ROW EXECUTE FUNCTION hash_user_auth_token();
