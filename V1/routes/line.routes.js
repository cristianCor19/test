import {Router} from 'express'
import { authRequired } from '../../middlewares/validateToken.js'

import {
  getLines,
  saveLine,
  deleteLines,
  updateLinesValues
    
}from '../../controllers/line.controller.js';

const router = Router()

router.get('/:movementId', authRequired, getLines);
router.post('/save/:movementId', authRequired, saveLine);
router.put('/update/:lineId', authRequired, updateLinesValues);
router.delete('/delete/:movementId', authRequired, deleteLines);

export default router;