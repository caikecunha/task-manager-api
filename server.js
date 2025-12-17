import app from './src/App.js';
import 'dotenv/config';
import { mongoConnect } from './src/shared/config/database.js';

(async function () {
    try {
        console.log('Conectando ao banco de dados...');

        await mongoConnect();

        console.log('Conexão bem sucedida!');

        app.emit('ok');
    } catch (err) {
        console.log(`Erro! ${err.message}`);
    }
})();

app.on('ok', () => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));
});
