import { Router } from 'express';
import { createUser, userLogin, userProfile, updateUserProfile, changePassword } from '../controllers/user.controller.js';
import { verifyUser } from '../middleware/auth.middleware.js';

const userRoutes = Router();

userRoutes.post('/register', createUser);
userRoutes.post('/login', userLogin);
userRoutes.get('/me', verifyUser, userProfile);
userRoutes.put('/me', verifyUser, updateUserProfile);
userRoutes.put('/me/password', verifyUser, changePassword);

export default userRoutes;