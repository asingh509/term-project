import express from 'express';
const app = express();
app.listen(3000, () => console.log('listening on port 3000'))

app.use(express.static('public'))
app.use(express.json())

import router from './routes/index.js';
app.use('/api/v1', router);