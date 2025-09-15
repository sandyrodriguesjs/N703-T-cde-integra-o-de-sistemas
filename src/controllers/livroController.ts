import { Request, Response } from 'express';
import { buscarLivros, buscarLivroPorId } from '../services/livroService';
import { traduzirTexto } from '../services/traducaoService';
import { formatarTexto } from '../utils/formatarTexto';

export const livroController = {

  getAll: (req: Request, res: Response) => {
    res.status(200).json({
      message: 'Use a rota /api/livros?query=termo para buscar livros',
      observacao: 'Tradução para PT-BR ativada por padrão. Para desativar, use traduzir=false',
      exemplo: 'http://localhost:3000/api/livros?query=harry+potter'
    });
  },

  getById: async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Parâmetro "id" é obrigatório' });
    }
    try {
      let livro = await buscarLivroPorId(id);
      if (!livro) {
        return res.status(404).json({ error: 'Livro não encontrado', id });
      }
      // Limpar tags HTML e traduzir descrição, se houver
      if (livro.descricao && livro.descricao !== 'Descrição não disponível') {
        const descricaoLimpa = formatarTexto(livro.descricao);
        livro.descricao = await traduzirTexto(descricaoLimpa, 'pt');
      }

      if (livro.titulo) {
        // Limpa tags HTML se houver e traduz para pt
        const tituloLimpo = formatarTexto(livro.titulo);
        livro.titulo = await traduzirTexto(tituloLimpo, 'pt');
      }
      res.json({ success: true, livro, traduzido: true });
    } catch (error) {
      console.error('Erro ao buscar livro por ID:', error);
      res.status(500).json({ error: 'Erro interno ao buscar livro por ID' });
    }
  },

  // Função principal de busca
  buscar: async (req: Request, res: Response) => {
    try {
      const { query, traduzir, maxResults } = req.query as {
        query: string;
        traduzir?: string;
        maxResults?: string;
      };

      if (!query) {
        return res.status(400).json({
          error: 'Parâmetro "query" é obrigatório'
        });
      }

      // Tradução habilitada por padrão, a menos que explicitamente "traduzir=false"
      const deveTraduzir = traduzir !== 'false';

      const limite = maxResults ? parseInt(maxResults) : 12;
      let livros = await buscarLivros(query, limite);

      if (livros.length === 0) {
        return res.status(404).json({
          message: 'Nenhum livro encontrado',
          query: query
        });
      }

      if (deveTraduzir) {

        for (const livro of livros) {
          if (livro.descricao && livro.descricao !== 'Descrição não disponível') {
            livro.descricao = await traduzirTexto(livro.descricao, 'pt');
          }

          if (livro.titulo) {
            livro.titulo = await traduzirTexto(livro.titulo, 'pt');
          }
        }
      }

      res.json({
        success: true,
        count: livros.length,
        query: query,
        traduzido: deveTraduzir,
        livros: livros
      });

    } catch (error) {
      console.error('Erro:', error);
      res.status(500).json({ error: 'Erro interno' });
    }
  }
};