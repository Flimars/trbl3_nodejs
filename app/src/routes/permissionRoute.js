import express from 'express';
import { addPermissionToUser, listUserPermissions, removePermissionFromUser } from '../controllers/permissionController.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import { checkAccess } from '../middlewares/accessControl.js';

const router = express.Router();


// Adicionar permissão
// router.post('/', isAuthenticated, hasRole(['superuser', 'admin']), addPermission);
router.post(
    '/add', 
    isAuthenticated, 
    checkAccess('Gestão de Usuários'), 
    addPermissionToUser
);

// Listar permissões
// router.get('/', isAuthenticated, hasRole(['superuser', 'admin']), listPermissions);
router.get(
    '/userId', 
    isAuthenticated, 
    checkAccess(['Gestão de Usuários']), 
    listUserPermissions
);

// Remover permissão
// router.post('/:id/delete', isAuthenticated, hasRole(['superuser', 'admin']), removePermission);
router.post(
    '/remove', 
    isAuthenticated, 
    checkAccess('Gestão de Usuários'), 
    removePermissionFromUser
);

export default router;
