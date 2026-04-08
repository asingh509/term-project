import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';


const db = new DatabaseSync(
    path.join(import.meta.dirname, '../disasters.db')
);

export default db;