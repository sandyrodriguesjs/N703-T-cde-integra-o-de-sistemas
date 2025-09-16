# BiblioConecta — README

> **API de Busca de Livros com Tradução**

---

## Objetivo do trabalho

O objetivo deste trabalho é desenvolver uma **API RESTful** capaz de realizar buscas de livros em fontes externas, como a **Google Books API**, e disponibilizar as informações no idioma português, mesmo quando a fonte original está em outro idioma. Para isso, a solução integra uma camada de tradução automática utilizando a **MyMemory Translation API**, oferecendo ao usuário uma experiência mais acessível e inclusiva ao consultar informações bibliográficas.

---

## Descrição funcional da solução

A solução foi projetada para oferecer:

###  Busca de livros

* Consulta unificada em fontes externas (Google Books API).
* Filtros por título, autor, ISBN ou palavra-chave.
* Suporte a paginação e limitação de resultados.

### Tradução integrada

* Tradução automática das descrições e metadados dos livros.
* Opção configurável para ativar/desativar tradução via parâmetro `translate`.
* Preservação de termos técnicos e nomes próprios durante a tradução.

### Documentação e usabilidade

* Rotas documentadas com Swagger/OpenAPI em `/docs`.
* Exemplos de uso disponíveis para Postman/Insomnia.

---

## Arquitetura da API

A API segue uma arquitetura modular, organizada em camadas:

* **Cliente** → navegador ou aplicativo que consome os endpoints.
* **API Express (Node.js)** → responsável por expor as rotas REST.
* **Rotas e Controllers** → controlam o fluxo das requisições HTTP.
* **Service** → camada responsável pela lógica de negócio e integração.
* **APIs externas** → Google Books API e MyMemory Translation API.

### Diagrama da Arquitetura

<img src="docs/architecture_diagram.png" alt="Diagrama da Arquitetura" width="300"/>



## Instruções de Execução

### 📌 Execução via Postman/Insomnia
Instruções detalhadas para execução da API utilizando ferramentas como **Postman** ou **Insomnia**.

### 📌 Documentação das Rotas
Documentação completa das rotas da API, incluindo parâmetros, exemplos de requisição e resposta.


---
