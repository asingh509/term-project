import express from 'express';
const router = express.Router();

import disastersRouter from './disasters.js';
import updatesRouter from './updates.js';

router.use('/disasters', disastersRouter);
router.use('./updatesRouter', updatesRouter);

export default router;