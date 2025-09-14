import { Router } from 'express';
import { livroController } from '../controllers/livroController';

const router = Router();

// Rotas CRUD (retornam mensagem informativa)
router.get('/livros', livroController.buscar);
router.get('/livros/:id', livroController.getById);

export default router;