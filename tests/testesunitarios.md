# Testes Unitários da API N703

Esta documentação descreve os testes unitários realizados nos endpoints da API da coleção N703, com exemplos de requisições, respostas esperadas e scripts de teste (Postman).

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

| Cenário | Requisição | Status Esperado | Resultado Esperado |
|---------|-----------|----------------|------------------|
| Busca válida | `/api/livros?query=sigmund+freud&maxResults=2&traduzir=true` | 200 | `success: true`, array de livros | ![Busca válida](tests/Busca_valida.png) |
| Query ausente | `/api/livros?query=&maxResults=2&traduzir=true` | 400 | Erro `"Parâmetro \"query\" é obrigatório"` | ![Quey ausente](tests/Query_ausente.png) |
| Nenhum livro encontrado | `/api/livros?query=adsasdads&maxResults=2&traduzir=true` | 404 | Erro `"Livro não encontrado"` | ![Nenhum_livro_encontrado](tests/Nenhum_livro_encontrado.png) |

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
