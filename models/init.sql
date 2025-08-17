\c codeshare
CREATE TABLE notebooks (
    notebook_id TEXT PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    content TEXT NOT NULL DEFAULT '',
    last_update TIMESTAMP DEFAULT now()
);