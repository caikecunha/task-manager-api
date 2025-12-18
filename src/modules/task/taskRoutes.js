import { Router } from 'express';
import taskController from './TaskController.js';
import { Auth } from '../../shared/middlewares/auth/Auth.js';

const router = new Router();

// Todas as rotas são protegidas
router.get('/', Auth.authenticate, taskController.index);

router.get('/:id', Auth.authenticate, taskController.show);

router.post('/', Auth.authenticate, taskController.create);

router.put('/:id', Auth.authenticate, taskController.update);

router.delete('/:id', Auth.authenticate, taskController.delete);

export default router;
