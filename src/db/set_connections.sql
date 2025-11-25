ALTER TABLE collection_entry ADD CONSTRAINT fk_collection_id FOREIGN KEY (collection_id) REFERENCES users (id) ON DELETE CASCADE;
