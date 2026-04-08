-- Reset tables (important for re-running)
DROP TABLE IF EXISTS updates;
DROP TABLE IF EXISTS disasters;
DROP TABLE IF EXISTS disaster_types;

--------------------------------------------------

-- Disaster Types
CREATE TABLE disaster_types (
    id    INTEGER PRIMARY KEY,
    name  TEXT NOT NULL UNIQUE
);

--------------------------------------------------

-- Disasters
CREATE TABLE disasters (
    id          INTEGER PRIMARY KEY,
    title       TEXT NOT NULL,
    location    TEXT NOT NULL,
    type_id     INTEGER NOT NULL,
    severity    TEXT NOT NULL CHECK (severity IN ('low','medium','high','critical')),
    reporter    TEXT NOT NULL,
    org_type    TEXT NOT NULL CHECK (org_type IN ('NGO','GO','Individual')),
    created_at  TEXT NOT NULL DEFAULT (datetime('now')),

    FOREIGN KEY (type_id) REFERENCES disaster_types(id)
);

--------------------------------------------------

-- Updates
CREATE TABLE updates (
    id          INTEGER PRIMARY KEY,
    disaster_id INTEGER NOT NULL,
    message     TEXT NOT NULL,
    author      TEXT NOT NULL,
    created_at  TEXT NOT NULL DEFAULT (datetime('now')),

    FOREIGN KEY (disaster_id) REFERENCES disasters(id)
);

--------------------------------------------------

-- Starter Data

INSERT INTO disaster_types (name) VALUES
    ('Earthquake'),
    ('Flood'),
    ('Wildfire'),
    ('Hurricane'),
    ('Tsunami');

--------------------------------------------------

INSERT INTO disasters (title, location, type_id, severity, reporter, org_type) VALUES
    ('Burnaby Flooding', 'Burnaby BC', 2, 'high', 'BC Emergency', 'GO'),
    ('Richmond Wildfire', 'Richmond BC', 3, 'critical', 'Red Cross', 'NGO'),
    ('Surrey Earthquake', 'Surrey BC', 1, 'medium', 'John Doe', 'Individual');

--------------------------------------------------

INSERT INTO updates (disaster_id, message, author) VALUES
    (1, 'Roads closed on Hastings St', 'BC Emergency'),
    (1, 'Evacuation order issued for zone 3', 'Red Cross'),
    (2, 'Fire 40% contained', 'Richmond Fire Dept');