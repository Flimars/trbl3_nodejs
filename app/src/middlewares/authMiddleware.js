
console.log('authMddleware.js esta Acessando rota');

// Verificar se o usuário está autenticado
export const isAuthenticated = (req, res, next) => {
    if (!req.session || !req.session.user) {
      return res.redirect('/auth/login');
    }
    next();
  };  
  
  // Verificar se o usuário tem um papel específico
  export const hasRole = (roles) => (req, res, next) => {
    if (!req.session || !req.session.user) {    
      return res.redirect('/login');
    }
    if (!roles.includes(req.session.user.role)) {
      return res.status(403).render('error', { message: 'Acesso negado.' });
    }
    next();
  };







  // export const isAuthenticated = (req, res, next) => {
  //   if (!req.session || !req.session.user) {
  //     return res.redirect('/login'); // Redireciona para a página de login
  //   }
  //   next();
  // }; 
  