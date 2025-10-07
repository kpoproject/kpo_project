ALTER TABLE users ADD CONSTRAINT fk_collection_id FOREIGN KEY (collection_id) REFERENCES collections (id) ON DELETE CASCADE;

ALTER TABLE collection_entry ADD CONSTRAINT fk_collection_id FOREIGN KEY (collection_id) REFERENCES collections (id) ON DELETE CASCADE;
