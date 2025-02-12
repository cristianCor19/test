import { Router } from "express";

const router = Router();

import {
  saveUser
} from '../../controllers/user.controller.js';

router.post('/save', saveUser);

export default router;