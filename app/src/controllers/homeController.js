export const home = async (req, res) => {
    try {
      const user = req.session.user || null;
  
      if (!user) {
        return res.redirect('/login');
      }
  
      res.render('home', { user });
    } catch (error) {
      console.error(error);
      res.status(500).render('error', { message: 'Erro ao carregar a tela inicial.' });
    }
  };
  