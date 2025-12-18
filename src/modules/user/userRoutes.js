import { Router } from 'express';
import userController from './UserController.js';
import { Auth } from '../../shared/middlewares/auth/Auth.js';

const router = new Router();

// Rota pública
router.post('/', userController.create);

// Rotas protegidas
router.get('/', Auth.authenticate, userController.show);

router.put('/', Auth.authenticate, userController.update);

router.delete('/', Auth.authenticate, userController.delete);


export default router;
