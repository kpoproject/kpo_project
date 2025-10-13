ALTER TABLE collections ADD CONSTRAINT fk_id FOREIGN KEY (id) REFERENCES users (collection_id) ON DELETE CASCADE;

ALTER TABLE collection_entry ADD CONSTRAINT fk_collection_id FOREIGN KEY (collection_id) REFERENCES collections (id) ON DELETE CASCADE;
