import { Router } from 'express';
import tokenController from './TokenController.js';

const router = new Router();

router.post('/', tokenController.create);

export default router;
