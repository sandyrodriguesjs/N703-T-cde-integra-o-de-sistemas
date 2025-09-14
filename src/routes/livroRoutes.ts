import { Router } from 'express';
import { livroController } from '../controllers/livroController';

const router = Router();

// Rotas CRUD (retornam mensagem informativa)
router.get('/livros', livroController.getAll);
router.get('/livros/:id', livroController.getById);

// Rota principal de busca
router.get('/buscar', livroController.buscar);

export default router;