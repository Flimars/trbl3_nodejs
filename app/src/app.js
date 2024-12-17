
import { PrismaClient } from '@prisma/client';
import { sessionConfig } from './config/session.js';
import 'dotenv/config';
import express from 'express';
import path from 'path';
import authRoute from './routes/authRoute.js';
import reportRoute from './routes/reportRoute.js';
import userManagementRoute from './routes/userManagementRoute.js';
import profileRoute from './routes/profileRoute.js';
import financialRoute from './routes/financialRoute.js';
import permissionRoute from './routes/permissionRoute.js';
import homeRoute from './routes/homeRoute.js';
import initializeSystem from './config/initialize.js';


const app = express();
const prisma = new PrismaClient({ 
  log: ['query', 'info', 'warn', 'error'],
});

// Define variáveis de ambiente
const NODE_ENV = process.env.NODE_ENV || 'development';

if (NODE_ENV === 'development') {
  process.env.APP_SECRET  = 'CHAVE-DA-APLICACAO-QUE-NAO-DEVE-SER-REVELADA';
  process.env.APP_PORT = 3000;
  process.env.APP_HOST = 'localhost';
}

// Exibe as variáveis de ambiente
console.log({
  NODE_ENV,
  APP_SECRET: process.env.APP_SECRET,
  APP_PORT: process.env.APP_PORT,
  APP_HOST: process.env.APP_HOST,
})

app.use(express.json());
app.use(sessionConfig());

// Middleware para servir arquivos estáticos
app.use(express.static('uploads')); 

// Middleware para decodificar os dados enviados via POST
app.use(express.urlencoded({ extended: true })); 

app.use('/', homeRoute);

app.use('/auth', authRoute);
app.use('/financial', financialRoute);
app.use('/profile', profileRoute);
app.use('/report', reportRoute);
app.use('/permission', permissionRoute);
app.use('/userManagement', userManagementRoute);
app.use('/css', express.static('public/css'));

// Configuração de engine de views
const __dirname = path.resolve(); // Para compatibilidade com ES Modules
app.set('views', path.join(__dirname, 'src', 'views')); // Diretório das views
app.set('view engine', 'ejs'); // Define o EJS como motor de templates

// Middleware de tratamento de erros
app.use((req, res, next) => {
  res.status(404).render('layout', {
    title: 'Erro 404',
    body: '<h1>Página não encontrada</h1>',
  });
});

// Middleware de tratamento de erros
app.use((error, req, res, next) => {
  // console.error('Erro:', error);
  res.status(500).render('layout', { 
    title: 'Erro interno no servidor.', 
    body: '<h1>Erro interno no servidor.</h1>',});
});

 
// Inicializa o sistema
initializeSystem().catch((error) => {
  console.error('Erro durante a inicialização:', error);
  process.exit(1);
});

// Exporta o app para uso em outros arquivos
export default app;
