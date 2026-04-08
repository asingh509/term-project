import db from './db.js';

const getByDisaster = disaster_id => {
    return db.prepare(`
        SELECT * FROM updates WHERE disaster_id = ?
        ORDER BY created_at DESC
    `).all(disaster_id);
};

const insert = update => {
    try {
        const result = db.prepare(`
            INSERT INTO updates (disaster_id, message, author)
            VALUES (?, ?, ?)
        `).run(update.disaster_id, update.message, update.author);
        return { status: 'success', id: result.lastInsertRowid };
    } catch (error) {
        console.log(error);
        return { status: 'error', message: error.message };
    }
};

export default { getByDisaster, insert };
