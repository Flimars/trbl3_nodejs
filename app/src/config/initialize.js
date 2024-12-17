import bcrypt from 'bcrypt';
import prisma from '../config/prismaClient.js';



// Função para inicializar o banco de dados
async function initializeSystem() {
  try {
    // Cria o superusuário se não existir
    const superUser = await prisma.user.findUnique({
      where: { email: 'superuser@gmail.com' },
    });

    if (!superUser) {
      const hashedPassword = await bcrypt.hash('superuser', 10);
      const createdUser = await prisma.user.create({
        data: {
          name: 'Superuser',
          email: 'superuser@gmail.com',
          password: hashedPassword,
          role: 'superuser',
        },
      });

      console.log('Superusuário criado com sucesso!');
      
      // Módulos fixos
      const modules = ['Gestão de Usuários', 'Módulo de Perfil', 'Módulo Financeiro', 'Módulo de Relatórios', 'Módulo de Produtos'];

      for (const moduleName of modules) {
        const module = await prisma.module.upsert({
          where: { name: moduleName },
          update: {},
          create: { name: moduleName },
        });

        // Associar o superusuário aos módulos
        await prisma.userPermission.create({
          data: {
            userId: createdUser.id,
            moduleId: module.id,
          },
        });
      }
      console.log('Módulos fixos criados e permissões atribuídas!');
    }
  } catch (error) {
    console.error('Erro ao inicializar o sistema:', error);
  }
}

export default initializeSystem;
