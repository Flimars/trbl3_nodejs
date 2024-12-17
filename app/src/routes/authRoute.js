import express from 'express';
import { login, logout } from '../controllers/authController.js';

const router = express.Router();

// Rota GET para exibir a página de login
router.get('/login', (req, res) => {
  res.render('layout', {
    title: 'Login',
    body: `
      <h1>Login</h1>
      <form action="/auth/login" method="POST">
        <input type="email" name="email" placeholder="E-mail" required>
        <input type="password" name="password" placeholder="Senha" required>
        <button type="submit">Entrar</button>
      </form>
    `,
  });
});

// Rota POST para autenticação do login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Simulação de login básico (substitua pelo sistema de autenticação real)
  if (email === 'admin@gmail.com' && password === 'admin') {
    req.session.user = { name: 'Admin', role: 'Admin' };
    res.redirect('/');
  } else {
    res.render('layout', {
      title: 'Erro de Login',
      body: '<h1>Usuário ou senha inválidos</h1>',
    });
  }
});

// Logout
router.post('/logout', logout);  // Rota de logout

export default router;
