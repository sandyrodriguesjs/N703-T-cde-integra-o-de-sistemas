import request from 'supertest';
import express from 'express';
import livroRouter from '../routes/livroRoutes';

// MOCK do service
jest.mock('../services/livroService', () => ({
  buscarLivros: jest.fn(() => Promise.resolve([
    {
      id: '1',
      titulo: 'Harry Potter',
      autor: 'J.K. Rowling'
    }
  ])),
  buscarLivroPorId: jest.fn((id: string) => Promise.resolve({
    id,
    titulo: 'Harry Potter',
    autor: 'J.K. Rowling'
  }))
}));

const app = express();
app.use(express.json());
app.use('/api', livroRouter);

describe('Testes de endpoints de livros', () => {

  it('Deve listar todos os livros', async () => {
    const response = await request(app).get('/api/livros?query=harry+potter');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.livros)).toBe(true);
    if (response.body.livros.length > 0) {
      expect(response.body.livros[0]).toHaveProperty('id');
      expect(response.body.livros[0]).toHaveProperty('titulo');
      expect(response.body.livros[0]).toHaveProperty('autor');
    }
  });
  it('Deve buscar um livro pelo ID', async () => {
    const livroId = '1';

    const response = await request(app).get(`/api/livros/${livroId}`);

    if (response.status === 200) {
      expect(response.body).toHaveProperty('livro');
      expect(response.body.livro).toHaveProperty('id', livroId);
      expect(response.body.livro).toHaveProperty('titulo');
      expect(response.body.livro).toHaveProperty('autor');
    } else {
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message');
    }
  });
});