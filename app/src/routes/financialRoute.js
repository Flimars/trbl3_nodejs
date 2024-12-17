
import express from 'express';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import { checkAccess } from '../middlewares/accessControl.js';
import { accessFinance } from './../controllers/financialController.js';


const router = express.Router();

router.get(
    '/', 
    isAuthenticated,
    checkAccess('Modulo Financeiro'),
    accessFinance
);

export default router;