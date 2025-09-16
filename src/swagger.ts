import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { Express } from 'express';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API da BiblioConecta',
        version: '1.0.0',
        description: 'Documentação da API que lista os livros e faz tradução simultânea para o Português',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Servidor local',
        },
    ],
    components: {
        schemas: {
            Livro: {
                type: 'object',
                properties: {
                    id: { type: 'string', example: '1' },
                    titulo: { type: 'string', example: 'Harry Potter' },
                    autor: { type: 'string', example: 'S. Gunelius' },
                    anoPublicacao: { type: 'integer', example: 2008 },
                    isbn: { type: 'string', example: '9780230594104' },
                    descricao: {
                        type: 'string',
                        example: 'Os livros de Harry Potter são os livros mais vendidos de todos os tempos. Neste estudo fascinante, Susan Gunelius analisa todos os aspectos do fenômeno da marca que é Harry Potter. Mergulhando em guerras de preços, receita de bilheteria e valores de marca, entre outras coisas, esta é a história do sucesso de marca mais incrível que já existiu.'
                    },
                    imagemCapa: {
                        type: 'string',
                        example: 'http://books.google.com/books/content?id=abYKXvCwEToC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
                    },
                },
                required: ['id', 'titulo', 'autor', 'anoPublicacao', 'isbn', 'descricao', 'imagemCapa'],
            },
        },
    },
};

const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.ts'], // Ajuste o caminho conforme sua estrutura de rotas
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}