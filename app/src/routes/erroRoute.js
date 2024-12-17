
import router from './userRoute';
const router = express.Router();

router.get('/', (req, res) => {
    // renderError(res, 'Módulo não especificado');
    // });
    res.render('layout', {
        title: 'Erro',
        body: `
      <h1>Erro</h1>
      <p>Erro ao acessar o módulo: ${message || "Não especificado"}.</p>
      <a href="/">Voltar para a página inicial</a>
    `,
    });
});
