import express from 'express';
import livroRoutes from './routes/livroRoutes';
import { setupSwagger } from './swagger'; // Importa a configuração do Swagger

const app = express();
app.use(express.json());

setupSwagger(app); // Adiciona a rota /api-docs

app.use('/api', livroRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));