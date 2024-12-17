
// logController.js
// export async function listLogs(req, res) {
//     const userId = req.session?.user?.id;
  
//     try {
//       const logs = await prisma.log.findMany({
//         where: { userId },
//         orderBy: { id: 'desc' },
//       });
  
//       res.status(200).json(logs);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Erro ao listar logs' });
//     }
//   }

// logRouter.js
import express from 'express';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import { listLogs } from '../controllers/logController.js';

const router = express.Router();

router.get('/', isAuthenticated, listLogs);

export default router;

  