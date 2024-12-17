/*
    O módulo financeiro é um módulo que permite o acesso a informações financeiras da empresa.

    Aqui está o código refatorado para usar **ES Modules** e ser compatível com o restante do projeto:
*/


export function accessFinance(req, res) {
  res.send('<h1>Acesso ao Módulo Financeiro permitido</h1>');
}



/*
---

### **Alterações Realizadas**
1. **Substituí `module.exports` por `export`**:
   - Agora a função `accessFinance` é exportada usando a sintaxe ES Modules.

---

### **Como Usar**
Ao importar essa função em outro arquivo, como uma rota, utilize:
```javascript
import { accessFinance } from '../controllers/financeController.js';

router.get('/finance', isAuthenticated, checkAccess('Módulo Financeiro'), accessFinance);
```

---

### **Explicação**
- **`isAuthenticated`**: Garante que o usuário esteja autenticado pela sessão.
- **`checkAccess('Módulo Financeiro')`**: Verifica se o usuário tem permissão para acessar o módulo.
- **`accessFinance`**: Controlador que envia a resposta ao cliente.

Essa refatoração alinha o código ao padrão ES Modules, mantendo a funcionalidade esperada. 😊

*/


