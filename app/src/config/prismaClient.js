// Code to create a new PrismaClient instance and export it for use in the application.
import { PrismaClient } from '@prisma/client'; // Importa o PrismaClient

const prisma = new PrismaClient({ 
      log: ['query', 'info', 'warn', 'error'],  });


export default prisma;
