import { Router } from 'express';
import { createUser, userLogin, userProfile } from '../controllers/user.controller.js';
import { verifyUser } from '../middleware/auth.middleware.js';

const userRoutes = Router();

userRoutes.post('/register', createUser);
userRoutes.post('/login', userLogin);
userRoutes.get('/me', verifyUser, userProfile);

export default userRoutes;