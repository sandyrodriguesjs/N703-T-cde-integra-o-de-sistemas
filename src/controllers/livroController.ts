import { Request, Response } from 'express';
import { buscarLivros, buscarLivroPorId } from '../services/livroService';
import { traduzirTexto } from '../services/traducaoService';

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
      const livro = await buscarLivroPorId(id);
      if (!livro) {
        return res.status(404).json({ error: 'Livro não encontrado', id });
      }
      res.json({ success: true, livro });
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
    console.log(`🔍 Buscando: "${query}"`, deveTraduzir ? '(com tradução)' : '');

    const limite = maxResults ? parseInt(maxResults) : 12;
    let livros = await buscarLivros(query, limite);

    if (livros.length === 0) {
      return res.status(404).json({ 
        message: 'Nenhum livro encontrado',
        query: query
      });
    }

    if (deveTraduzir) {
      console.log('🌐 Traduzindo...');
      
      for (const livro of livros) {
        if (livro.descricao && livro.descricao !== 'Descrição não disponível') {
          livro.descricao = await traduzirTexto(livro.descricao, 'pt');
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