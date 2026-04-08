import express from 'express';
const updatesRouter = express.Router();

import { getUpdates, postUpdate } from '../controllers/updates.js';
import { postUpdateValidator } from '../validators/updates.js';

updatesRouter.get('/', getUpdates);
updatesRouter.post('/', [postUpdateValidator], postUpdate);

export default updatesRouter;