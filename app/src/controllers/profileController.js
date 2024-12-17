import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient( { log: ['query', 'info', 'warn', 'error'] } );

// Configuração de upload de imagens
const upload = multer({
  dest: path.join(__dirname, '../../uploads'),
});

async function viewProfile(req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, username: true, role: true, image: true },
    });

    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao carregar perfil' });
  }
}

async function updateProfileImage(req, res) {
  const file = req.file;

  if (!file) return res.status(400).json({ error: 'Nenhuma imagem enviada' });

  try {
    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: { image: file.path },
    });

    res.json({ message: 'Imagem atualizada com sucesso', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar imagem' });
  }
}

export  { upload, viewProfile, updateProfileImage };