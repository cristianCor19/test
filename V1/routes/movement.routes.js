import {Router} from 'express'
import { authRequired } from '../../middlewares/validateToken.js'

import {
  getMovements,
  saveMovement,
  deleteMovements
    
}from '../../controllers/movement.controller.js';

const router = Router()

router.get('/:projectId', authRequired, getMovements);
router.post('/save/:projectId', authRequired, saveMovement);
router.delete('/delete/:projectId', authRequired, deleteMovements);

export default router;