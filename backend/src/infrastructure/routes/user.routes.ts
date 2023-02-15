import { Router } from 'express';
import { controller } from '../factories/UserFactory';

const userRoutes = Router()
userRoutes.post('/register', controller.register);
userRoutes.post('/login', controller.login);
userRoutes.get('/logout', controller.logout);

export default userRoutes;