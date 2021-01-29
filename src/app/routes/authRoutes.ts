import { Router } from 'express';
import AuthController from './../controllers/authController';
import { checkAuth } from './../middlewares/authMiddleware';

let router: Router = Router();

router.post('/auth', AuthController.login )

router.post('/register', AuthController.register )

router.get('/auth', checkAuth, AuthController.getDataUser )

router.delete('/logout', checkAuth, AuthController.logout )

export default router;