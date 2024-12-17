import session from 'express-session';

function sessionConfig() {
  return session({
    secret: process.env.APP_SECRET || 'CHAVE-DA-APLICACAO-QUE-NAO-DEVE-SER-REVELADA', 
    //"process.env.APP_SECRET,",  
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: true, // Alterar para true em produção com HTTPS
      httpOnly: true,
      maxAge: 1000 * 60 * 60, // 1 hora
    },
  });
}

export {
    sessionConfig
  };


