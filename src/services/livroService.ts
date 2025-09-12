import axios from 'axios';
import { Livro } from '../models/livroModel';

const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

export async function buscarLivros(query: string, maxResults: number = 5): Promise<Livro[]> {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: query,
        maxResults: maxResults,
        printType: 'books',
        langRestrict: 'pt,en'
      },
      timeout: 10000
    });

    if (!response.data.items || response.data.items.length === 0) {
      console.log('Nenhum livro encontrado na API externa');
      return [];
    }

    const livros: Livro[] = response.data.items.map((item: any, index: number) => {
      const volumeInfo = item.volumeInfo;
      
      return {
        id: index + 1,
        titulo: volumeInfo.title || 'Título não disponível',
        autor: volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Autor desconhecido',
        anoPublicacao: volumeInfo.publishedDate ? 
          new Date(volumeInfo.publishedDate).getFullYear() : undefined,
        isbn: volumeInfo.industryIdentifiers ? 
          volumeInfo.industryIdentifiers.find((id: any) => id.type === 'ISBN_13')?.identifier || 
          volumeInfo.industryIdentifiers[0]?.identifier : undefined,
        descricao: volumeInfo.description || 'Descrição não disponível',
        imagemCapa: volumeInfo.imageLinks?.thumbnail || 
                   volumeInfo.imageLinks?.smallThumbnail
      };
    }).filter((livro: Livro) => livro.titulo !== 'Título não disponível');

    return livros;

  } catch (error: any) {
    console.error('Erro ao buscar livros na API:', error.message);
    return [];
  }
}