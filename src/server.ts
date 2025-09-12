import express from 'express';
import livroRoutes from './routes/livroRoutes';

const app = express();
app.use(express.json());

app.use('/api', livroRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
