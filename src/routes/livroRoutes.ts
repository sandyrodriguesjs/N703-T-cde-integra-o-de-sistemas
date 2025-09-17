import { Router } from 'express';
import { livroController } from '../controllers/livroController';

const router = Router();

/**
 * @swagger
 * /api/livros:
 *   get:
 *     summary: Lista todos os livros disponíveis.
 *     description: Retorna uma lista de livros disponvíveis no Google Books API com tradução simultânea.
 *     responses:
 *       200:
 *         description: Lista de livros retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Livro'
 */
router.get('/livros', livroController.buscar);

/**
 * @swagger
 * /api/livros/{id}:
 *   get:
 *     summary: Busca um livro pelo ID.
 *     description: Retorna os detalhes de um livro específico disponível no Google Books, incluindo tradução simultânea se disponível.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do livro a ser buscado.
 *     responses:
 *       200:
 *         description: Livro encontrado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Livro'
 *       404:
 *         description: Livro não encontrado.
 */
router.get('/livros/:id', livroController.getById);

export default router;