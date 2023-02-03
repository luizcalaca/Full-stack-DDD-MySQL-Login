import { Router } from 'express';
import { controller } from '../factories/UserFactory';

const userRoutes = Router()
userRoutes.post('/register', controller.register);
userRoutes.post('/login', controller.login);
userRoutes.post('/logout', controller.logout);

export default userRoutes;