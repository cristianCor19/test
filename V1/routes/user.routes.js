import { Router } from "express";
import { validateRequestBody } from "../../middlewares/validateRequest.js";
import { registerUserSchema } from "../../schema/user.schema.js";

const router = Router();

import {
  saveUser
} from '../../controllers/user.controller.js';

router.post('/save', validateRequestBody(registerUserSchema),saveUser);

export default router;