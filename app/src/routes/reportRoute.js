
// Importa o express
import express from 'express';
import { checkAccess } from '../middlewares/accessControl.js';
import { isAuthenticated } from './../middlewares/authMiddleware.js';


const router = express.Router();

// Rota protegida para o módulo de Relatórios
router.get(
  '/',
  isAuthenticated, 
  checkAccess('Módulo de Relatórios'), // Verifica permissões
  (req, res) => {
    res.send('<h1>Acesso ao Módulo de Relatórios permitido</h1>');
  }
);

export default router;
