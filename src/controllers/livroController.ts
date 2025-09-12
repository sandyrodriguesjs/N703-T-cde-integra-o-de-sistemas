import { Request, Response } from 'express';
import { buscarLivros } from '../services/livroService';
import { traduzirTexto } from '../services/traducaoService';

export const livroController = {
  // Como não temos banco local, essas funções podem retornar vazio ou erro
  getAll: (req: Request, res: Response) => {
    res.status(200).json({ 
      message: 'Use a rota /api/buscar?query=termo para buscar livros',
      exemplo: 'http://localhost:3000/api/buscar?query=harry+potter&traduzir=true'
    });
  },

  getById: (req: Request, res: Response) => {
    res.status(404).json({ 
      error: 'Funcionalidade não disponível. Use a busca por query.' 
    });
  },

  create: (req: Request, res: Response) => {
    res.status(404).json({ 
      error: 'Funcionalidade não disponível. Esta API apenas busca livros externos.' 
    });
  },

  update: (req: Request, res: Response) => {
    res.status(404).json({ 
      error: 'Funcionalidade não disponível.' 
    });
  },

  delete: (req: Request, res: Response) => {
    res.status(404).json({ 
      error: 'Funcionalidade não disponível.' 
    });
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

    const deveTraduzir = traduzir === 'true';
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