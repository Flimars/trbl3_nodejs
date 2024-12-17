// Objetivo: Definir as rotas para o módulo de gestão de usuários. A rota /users deve listar os usuários cadastrados no sistema. A rota /users/create deve exibir um formulário para criar um novo usuário. A rota /users/:id/delete deve excluir um usuário do sistema. Todas as rotas devem ser acessíveis apenas para usuários autenticados e com a permissão de 'Gestão de Usuários'.

// Crie o arquivo app/src/routes/userManagementRoute.js e defina as rotas para o módulo de gestão de usuários.
import express from 'express';
import { checkAccess } from '../middlewares/accessControl.js';
import { listUsers } from '../controllers/userManagementController.js';
import { isAuthenticated } from './../middlewares/authMiddleware.js';

const router = express.Router();

router.get(
    '/',
    isAuthenticated,
    checkAccess('Gestão de Usuários'),
    listUsers
);

router.post('/add', async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.create({
            data: { name, email, password: hashedPassword, role },
        });
        res.status(201).json({ message: 'Usuário criado com sucesso.' });
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ message: 'Erro ao criar usuário.' });
    }
});


export default router;