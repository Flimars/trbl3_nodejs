// Importando bcrypt e prismaClient
import bcrypt from 'bcrypt';
import prisma from '../config/prismaClient.js';

console.log('userController.js está Acessando rota /users');

// Listar usuários
export const listUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, username: true, role: true, image: true },
    });
    res.render('users/list', { users });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Erro ao listar usuários.' });
  }
};

// Criar usuário
export const createUser = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    if (!['admin', 'user'].includes(role)) {
      return res.status(400).render('error', { message: 'Papel inválido.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, password: hashedPassword, role },
    });

    res.redirect('/users');
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Erro ao criar usuário.' });
  }
};

// Excluir usuário
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.user.delete({ where: { id: parseInt(id, 10) } });
    res.redirect('/users');
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Erro ao excluir usuário.' });
  }
};

