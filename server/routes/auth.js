import express from 'express';
import { loginUser, registerUser, getUserProfile, getUsers, deleteUser, createUser } from '../controllers/auth.js';

import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/profile', protect, getUserProfile);
router.get('/users', protect, admin, getUsers);
router.post('/users', protect, admin, createUser);
router.delete('/users/:id', protect, admin, deleteUser);

export default router;

