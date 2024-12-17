import prisma from '../config/prismaClient.js';

// Adicionar permisão a um usuário
async function addPermissionToUser(req, res) {
  const { userId, moduleId } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {  // Verifica se o usuário existe
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const module = await prisma.module.findUnique({
      where: { id: moduleId },
    });

    if (!module) {  // Verifica se o módulo existe
      return res.status(404).json({ message: 'Módulo não encontrado' });
    }

    await prisma.permission.create({
      data: {
        user: { connect: { id: userId } },
        module: { connect: { id: moduleId } },
      },
    });

    return res.status(201).json({ message: 'Permissão adicionada com sucesso' });
  } catch (error) {
    console.error('Erro ao adicionar permissão:', error);
    return res.status(500).json({ message: 'Erro ao adicionar permissão' });
  }
}

// Listar permissões de um usuário
async function listUserPermissions(req, res) {
    const { userId } = req.params;
  
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { permissions: { include: { module: true } } },
      });
  
      if (!user) {  // Verifica se o usuário existe
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
  
      return res.status(200).json(user.permissions);
    } catch (error) {
      console.error('Erro ao listar permissões:', error);
      return res.status(500).json({ message: 'Erro ao listar permissões' });
    }
  }

// Remover permissão de um usuário
async function removePermissionFromUser(req, res) {
  const { userId, moduleId } = req.body;

  try {
    const permission = await prisma.permission.findFirst({
      where: {
        userId: userId,
        moduleId: moduleId,
      },
    });

    if (!permission) {  // Verifica se a permissão existe
      return res.status(404).json({ message: 'Permissão não encontrada' });
    }

    await prisma.permission.delete({
      where: { id: permission.id },
    });

    return res.status(200).json({ message: 'Permissão removida com sucesso' });
  } catch (error) {
    console.error('Erro ao remover permissão:', error);
    return res.status(500).json({ message: 'Erro ao remover permissão' });
  }
}



export { addPermissionToUser, listUserPermissions, removePermissionFromUser };