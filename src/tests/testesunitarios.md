# Testes Unitários da API N703

Esta documentação descreve os testes unitários realizados nos endpoints da API da coleção N703, com exemplos de requisições, respostas esperadas e scripts de teste (Postman) e testes utilizado JEST.

---

## Endpoints

### 1. Buscar livros
**Rota:** `GET /api/livros`  
**Descrição:** Busca livros no Google Books, com suporte a tradução para PT-BR.  

#### Parâmetros:
- `query` (obrigatório): termo de busca (título, autor, etc.)  
- `maxResults` (opcional): número máximo de resultados (padrão: 12)  
- `traduzir` (opcional): ativa/desativa tradução automática (padrão: true)  

#### Testes realizados:

| Cenário | Requisição | Status Esperado | Resultado Esperado | Print |
|---------|-----------|----------------|------------------|-------|
| Busca válida | `/api/livros?query=sigmund+freud&maxResults=2&traduzir=true` | 200 | `success: true`, array de livros | ![Busca válida](busca_valida.png) |
| Query ausente | `/api/livros?query=&maxResults=2&traduzir=true` | 400 | Erro `"Parâmetro \"query\" é obrigatório"` | ![Query ausente](query_ausente.png) |
| Nenhum livro encontrado | `/api/livros?query=adsasdads&maxResults=2&traduzir=true` | 404 | Erro `"Livro não encontrado"` | ![Nenhum livro encontrado](nenhum_livro_encontrado.png) |




---

### 2. Buscar livro por ID
**Rota:** `GET /api/livros/:id`  
**Descrição:** Retorna os detalhes de um livro específico disponível no Google Books.  

#### Parâmetros:
- `id` (obrigatório): identificador do livro no Google Books  

#### Testes realizados:

| Cenário | Requisição | Status Esperado | Resultado Esperado |
|---------|-----------|----------------|------------------|
| Busca válida | `/api/livros/DhPUDwAAQBAJ` | 200 | `success: true`, objeto `livro` presente |
| ID ausente | `/api/livros/` | 400 | Erro `"Parâmetro \"id\" é obrigatório"` |
| Livro não encontrado | `/api/livros/asdsadsasda` | 404 | Erro `"Livro não encontrado"` |

---

## Script de teste (Postman)

```javascript
// ----------------------
// Testes do endpoint: Buscar livros
// ----------------------

// Teste de sucesso
pm.test("Buscar livros: Status code é 200", () => pm.response.to.have.status(200));
pm.test("Buscar livros: Resposta contém sucesso true", () => {
    const jsonData = pm.response.json();
    pm.expect(jsonData.success).to.eql(true);
});
pm.test("Buscar livros: Resposta contém array de livros", () => {
    const jsonData = pm.response.json();
    pm.expect(jsonData.livros).to.be.an("array");
});

// Teste de erro: query ausente
if (pm.request.url.getQueryString().includes("query=") && pm.request.url.getQueryString().endsWith("=")) {
    pm.test("Buscar livros: Status code é 400 quando query ausente", () => pm.response.to.have.status(400));
    pm.test("Buscar livros: Retorna erro 'Parâmetro \"query\" é obrigatório'", () => {
        const jsonData = pm.response.json();
        pm.expect(jsonData.error).to.eql('Parâmetro "query" é obrigatório');
    });
}

// Teste de erro: nenhum livro encontrado
const jsonDataLivros = pm.response.json();
if (jsonDataLivros.error === "Livro não encontrado") {
    pm.test("Buscar livros: Status code é 404 quando nenhum livro encontrado", () => pm.response.to.have.status(404));
}

// ----------------------
// Testes do endpoint: Buscar livro por ID
// ----------------------

// Teste de sucesso
pm.test("Buscar livro por ID: Status code é 200", () => pm.response.to.have.status(200));
pm.test("Buscar livro por ID: Resposta contém sucesso true", () => {
    const jsonData = pm.response.json();
    pm.expect(jsonData.success).to.eql(true);
});
pm.test("Buscar livro por ID: Resposta contém objeto livro", () => {
    const jsonData = pm.response.json();
    pm.expect(jsonData.livro).to.be.an("object");
});

// Teste de erro: ID ausente
if (pm.request.url.getPath().endsWith("/livros/")) {
    pm.test("Buscar livro por ID: Status code é 400 quando id ausente", () => pm.response.to.have.status(400));
    pm.test("Buscar livro por ID: Retorna erro 'Parâmetro \"id\" é obrigatório'", () => {
        const jsonData = pm.response.json();
        pm.expect(jsonData.error).to.eql('Parâmetro "id" é obrigatório');
    });
}

// Teste de erro: livro não encontrado
const jsonDataID = pm.response.json();
if (jsonDataID.error === "Livro não encontrado") {
    pm.test("Buscar livro por ID: Status code é 404 quando livro não encontrado", () => pm.response.to.have.status(404));
}

# Testes Unitários com Jest

A API possui testes unitários implementados com Jest e Supertest, garantindo que os endpoints funcionem corretamente sem depender de APIs externas.

## Estrutura dos testes

Os testes estão localizados na pasta de testes do projeto, normalmente `__tests__` ou próxima das rotas (`tests/livroRoutes.test.ts`).

Os cenários testados são:

### 1. Listar todos os livros

**Objetivo:** verificar se a rota `/api/livros` retorna uma lista de livros com as propriedades corretas.

**Endpoint testado:** `GET /api/livros?query={termo}`

**Mock usado:** a função `buscarLivros` do service retorna um array de livros fictícios.

**Verificações realizadas:**

*   Status da resposta é `200 OK`
*   A resposta contém um array (`Array.isArray(response.body.livros)`)
*   Cada item do array possui as propriedades:
    *   `id`
    *   `titulo`
    *   `autor`

**Exemplo de teste:**

```javascript
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
```

### 2. Buscar livro por ID

**Objetivo:** verificar se a rota `/api/livros/{id}` retorna o livro correto ou uma mensagem de erro quando não encontrado.

**Endpoint testado:** `GET /api/livros/{id}`

**Mock usado:** a função `buscarLivroPorId` do service retorna um livro fictício ou `null` se não encontrado.

**Verificações realizadas:**

*   **Se o livro existir:**
    *   Status da resposta é `200 OK`
    *   O objeto retornado possui:
        *   `id` igual ao passado na URL
        *   `titulo`
        *   `autor`
*   **Se o livro não existir:**
    *   Status da resposta é `404 Not Found`
    *   O objeto retornado possui a propriedade `message`

**Exemplo de teste:**

```javascript
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
```

## Como rodar os testes

No terminal, dentro da pasta do projeto, execute:

```bash
npm test
```

ou

```bash
jest
```

* Todos os testes unitários usarão mocks para não depender da API externa.
* O Jest verifica o comportamento das rotas e garante que os endpoints retornem os dados corretamente.