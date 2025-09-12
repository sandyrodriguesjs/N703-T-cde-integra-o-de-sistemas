export interface Livro {
  id?: number; // ID opcional para livros da API externa
  titulo: string;
  autor: string; // Mudei de 'autores' para 'autor' para manter consistência
  anoPublicacao?: number;
  isbn?: string;
  descricao?: string;
  imagemCapa?: string;
}
