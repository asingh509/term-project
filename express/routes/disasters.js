import express from 'express';
const disastersRouter = express.Router();

import { getDisasters, getDisaster, postDisaster} from '../controllers/disasters.js';
import { postDisasterValidator } from '../validators/disasters.js';

disastersRouter.get('/', getDisasters);
disastersRouter.get('/:id', getDisaster);
disastersRouter.post('/', [postDisasterValidator], postDisaster);

export default disastersRouter;