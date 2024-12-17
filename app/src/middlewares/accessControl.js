import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient( { log: ['query', 'info', 'warn', 'error'] } );

// Middleware para verificar permissões
export function checkAccess(moduleName) {
  return async (req, res, next) => {
    const userId = req.session?.user?.id;  // Obtém o ID do usuário da sessão  req.session?.user?.id;

    if (!userId) {
      return res.status(401).redirect('/auth/login');
    }

    try {
      // Verifica se o módulo existe
      const module = await prisma.module.findUnique({
        where: { name: moduleName },
      });

      if (!module) {
        return res.status(404).json({ error: `Módulo "${moduleName}" não encontrado.` });
      }

      // Verifica se o usuário possui permissão para acessar o módulo
      const permission = await prisma.permission.findFirst({
        where: {
          moduleId_userId: {
            userId: userId,
            moduleId: module.id,
          },
          // userId,
          // moduleId: module.id,
        },
      });

      await prisma.log.create({
        data: {
          description: `Acesso ${permission ? 'permitido' : 'negado'} ao módulo ${moduleName}`,
          userId,
        },
      });

      // Registra a tentativa de acesso no banco de dados
      const status = permission ? 'granted' : 'denied';
      await prisma.accessLog.create({
        data: {
          userId,
          url: req.originalUrl,
          status,
        },
      });

      if (!permission) {
        return res.status(403).json({ error: `SEM PERMISSÃO PARA ACESSAR O MÓDULO "${moduleName}".` });
      }

      // Usuário tem permissão, continua para o próximo middleware
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao verificar permissões' });
    }
  };
}
