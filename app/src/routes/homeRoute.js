// import express from 'express';

// const router = express.Router();

// router.get('/', (req, res) => {
//   res.render('home', { user: req.session.user || null });
// });

// export default router;

import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  const user = req.session.user || { name: "Visitante", role: 'Desconhecido' };
  res.render('layout', {
    title: 'Página Inicial',
    body: `<h1>Bem-vindo, ${req.session.user?.name || "Usuário"}!</h1>
    <p>Esse é o sistema de controle de acesso.</p>
    <p>Seu papel é: <strong>${user.role}</strong></p>
      <ul>
        <li><a href="/auth/login">Login</a></li>
        <li><a href="/profile">Meu Perfil</a></li>
        <li><a href="/userManagement">Gerenciamento de Usuários</a></li>
        <li><a href="/financial">Módulo Financeiro</a></li>
        <li><a href="/report">Relatórios</a></li>
      </ul>
    `,
  });
});

// router.get('/', (req, res) => {
//   res.send('<h1>Bem-vindo ao Sistema de Controle de Acesso</h1>');
// });

export default router;



// import express from 'express';
// import { home } from '../controllers/homeController.js';
// import { isAuthenticated } from '../middlewares/authMiddleware.js';

// const router = express.Router();

// router.get('/', isAuthenticated, home);

// export default router;

