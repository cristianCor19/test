import {Router} from 'express';
import { authRequired } from '../../middlewares/validateToken.js';
import {validateRequestQuery} from '../../middlewares/validateRequest.js';
import { searchProjectsSchema } from '../../schema/projects.schema.js';


import {
  saveProject,
  getProjects,
  deleteProject,
  searchProjects
    
}from '../../controllers/project.controller.js';

const router = Router()

router.get('/', authRequired, getProjects);
router.get('/search', authRequired, validateRequestQuery(searchProjectsSchema),searchProjects);
router.post('/save', authRequired, saveProject);
router.delete('/delete', authRequired, deleteProject);

export default router;