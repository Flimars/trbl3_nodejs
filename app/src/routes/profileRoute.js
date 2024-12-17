import express from 'express';
import { viewProfile, updateProfileImage } from '../controllers/profileController.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import upload from '../config/multerConfig.js';

const router = express.Router();

// Visualizar perfil
router.get('/', isAuthenticated, viewProfile);

// Atualizar imagem de perfil
router.post('/image', isAuthenticated, upload.single('profileImage'), updateProfileImage);

export default router;
