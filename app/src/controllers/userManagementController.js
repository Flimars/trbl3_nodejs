import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function listUsers(req, res) {
  try {
    // Verifica se o usuário está autenticado pela sessão
    if (!req.session || !req.session.user) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    // Lista os usuários do banco de dados
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        role: true,
        image: true,
      },
    });

    res.json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar usuários' });
  }
}
