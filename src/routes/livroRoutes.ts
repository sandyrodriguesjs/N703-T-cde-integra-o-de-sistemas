import { Router } from 'express';
import { livroController } from '../controllers/livroController';

const router = Router();

// Rotas CRUD (retornam mensagem informativa)
router.get('/livros', livroController.getAll);
router.get('/livros/:id', livroController.getById);
router.post('/livros', livroController.create);
router.put('/livros/:id', livroController.update);
router.delete('/livros/:id', livroController.delete);

// Rota principal de busca
router.get('/buscar', livroController.buscar);

export default router;