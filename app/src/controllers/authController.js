import bcrypt from 'bcrypt';
import prisma from '../config/prismaClient.js';


console.log('authController.js está Acessando rota /users');

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;  // Recebe os dados do formulário

  try {
    console.log('Recebendo Dados - req.body: ', req.body);

    const user = await prisma.user.findUnique(
      { where:
         { email: email, }, 
        });

    console.log('Usuário encontrado no banco:', user);  
        
    if (!user) {
      console.log('Usuário não encontrado');
      return res.render('layout', { 
        title: 'Erro de Login', 
        body: '<h1>Usuário ou senha inválidos</h1>'
       });
      // return res.status(404).render('error', { message: 'Usuário não encontrado.' });
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    console.log('Senha válida:', isPasswordValid);
    
    if (!isPasswordValid) {
      // await prisma.log.create({
      //   data: { description: 'Tentativa de login com senha incorreta', userId: user.id },
      // });     
      return res.render('layout', { 
        title: 'Erro de Login', 
        body: '<h1>Usuário ou senha inválidos</h1>'
       });
    }

    // if (user.role !== 'USER') {
    //   return res.render('error', { message: 'Usuário ou senha inválidos' });
    // }

    // Configurando a sessão
    req.session.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    await prisma.log.create({
      data: { description: 'Login bem-sucedido', userId: user.id },
    });

    res.redirect('/'); // Redireciona para a tela inicial
  } catch (error) {
    console.error('Erro ao realizar o login:', error);
    res.status(500).render('layout', { title: 'Erro ao realizar login.', body:'<h1>Erro interno. Tente novamente mais tarde.' });
  }
};

// Logout
export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).render('error', { message: 'Erro ao encerrar a sessão.' });
    }
    res.clearCookie('connect.sid');
    res.redirect('/login'); // Redireciona para a página de login
  });
};


//----------------------------------------------------------------------------------
// async function login(req, res) {    

//     const { email, password } = req.body;

//     // Verifica se os campos foram preenchidos
//     if (!email || !password) {
//         return res.status(400).send('Todos os campos são obrigatórios');
//     }

//     const user = await prisma.user.findUnique({ where: { email } });

//     //  Verifica se o usuário existe e se a senha está correta  
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//         return res.status(401).send('Credenciais inválidas');
//     }

//     req.session.user = { id: user.id, email: user.email, role: user.role };
//     res.redirect('/');
// };

// async function register(req, res) {
//     const { name, email, password } = req.body;

//     // Verifica se os campos foram preenchidos
//     if (!name || !email || !password) {
//         return res.status(400).send('Todos os campos são obrigatórios');
//     }

//     const existingUser = await prisma.user.findUnique({ where: { email } });
//     // Verifica se o usuário já existe
//     if (existingUser) {
//         return res.status(400).send('Email já está em uso');
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const photo = req.file;
//     let photoPath = null;
//     // Verifica se o usuário enviou uma foto
//     if (photo) {
//         photoPath = path.join('uploads', photo.filename);
//     }

//     try {
//         await prisma.user.create({
//             data: {
//                 name,
//                 email,
//                 password: hashedPassword,
//                 role: 'USER',
//                 imageId: photoPath,
//             },
//         });
//         res.redirect('/auth/login');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Erro ao registrar usuário');
//     }
// };


// export {        
//     login,
//     register
// };
//------------------------------

