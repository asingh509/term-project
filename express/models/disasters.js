import db from './db.js';

const getAll = ({ limit = -1, offset = 0, severity } = {}) => {
    let query = `
        SELECT d.id, d.title, d.location, d.severity, d.reporter,
               d.org_type, d.created_at, dt.name AS type
        FROM disasters d
        JOIN disaster_types dt ON d.type_id = dt.id`
    const params = [];
    if (severity) {
        query += ` WHERE d.severity = ?`;
        params.push(severity);
    }
    query += ` ORDER BY d.created_at DESC LIMIT ? OFFSET ?`;
    params.push(limit, offset);
    return db.prepare(query).all(...params);
};

const getById = id => {
    return db.prepare(`
        SELECT d.id, d.title, d.location, d.severity, d.reporter,
               d.org_type, d.created_at, dt.name AS type
        FROM disasters d
        JOIN disaster_types dt ON d.type_id = dt.id
        WHERE d.id = ?
    `).get(id);
};

const insert = disaster => {
    try {
        const result = db.prepare(`
            INSERT INTO disasters (title, location, type_id, severity, reporter, org_type)
            VALUES (?, ?, ?, ?, ?, ?)
        `).run(
            disaster.title, disaster.location, disaster.type_id,
            disaster.severity, disaster.reporter, disaster.org_type
        );
        return { status: 'success', id: result.lastInsertRowid };
    } catch (error) {
        console.log(error);
        return { status: 'error', message: error.message };
    }
};

export default { getAll, getById, insert };
