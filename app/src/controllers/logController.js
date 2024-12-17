export async function listLogs(req, res) {
    const userId = req.session?.user?.id;    // Obtém o ID do usuário da sessão
  
    try {
      const logs = await prisma.log.findMany({    // Busca os logs do usuário
        where: { userId },
        orderBy: { id: 'desc' },                  //'desc' para ordem decrescente
      });
  
      res.status(200).json(logs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao listar logs' });
    }
  }
  