import express from 'express';
import { listUsers, createUser, deleteUser } from '../controllers/userController.js';
import { isAuthenticated, hasRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Listar usuários (Apenas superusuário ou admin)
router.get('/', isAuthenticated, hasRole(['superuser', 'admin']), listUsers);

// Criar usuário (Apenas superusuário ou admin)
router.post('/', isAuthenticated, hasRole(['superuser', 'admin']), createUser);

// Excluir usuário (Apenas superusuário ou admin)
router.delete('/:id', isAuthenticated, hasRole(['superuser', 'admin']), deleteUser);

export default router;
