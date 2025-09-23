{
	"info": {
		"_postman_id": "1a160fc2-0f0c-441b-a2ed-77f7ff2be973",
		"name": "N703-API-Testes",
		"description": "Coleção de testes para os endpoints da API do trabalho N703",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "48693972",
		"_collection_link": "https://vitoriaoliveir-2716154.postman.co/workspace/VIT%2525D3RIA-DE-OLIVEIRA-ALMEIDA's~e61d96f9-12e8-418c-8e6e-6b06694eb1f1/collection/48693972-1a160fc2-0f0c-441b-a2ed-77f7ff2be973?action=share&source=collection_link&creator=48693972"
	},
	"item": [
		{
			"name": "Buscar livros",
			"event": [
				{
					"listen": "test",
					"script": {
						"exec": [
							"// Teste de sucesso",
							"pm.test(\"Status code é 200\", function () {",
							"    pm.response.to.have.status(200);",
							"});",
							"",
							"pm.test(\"Resposta contém sucesso true\", function () {",
							"    const jsonData = pm.response.json();",
							"    pm.expect(jsonData.success).to.eql(true);",
							"});",
							"",
							"pm.test(\"Resposta contém array de livros\", function () {",
							"    const jsonData = pm.response.json();",
							"    pm.expect(jsonData.livros).to.be.an(\"array\");",
							"});",
							"",
							"// Teste de erro: query ausente",
							"if(pm.request.url.getQueryString().includes(\"query=\") && pm.request.url.getQueryString().endsWith(\"=\")) {",
							"    pm.test(\"Status code é 400 quando query ausente\", function () {",
							"        pm.response.to.have.status(400);",
							"    });",
							"",
							"    pm.test(\"Retorna erro 'Parâmetro \\\"query\\\" é obrigatório'\", function () {",
							"        const jsonData = pm.response.json();",
							"        pm.expect(jsonData.error).to.eql('Parâmetro \"query\" é obrigatório');",
							"    });",
							"}",
							"",
							"// Teste de erro: nenhum livro encontrado",
							"const jsonData = pm.response.json();",
							"if(jsonData.error === \"Livro não encontrado\") {",
							"    pm.test(\"Status code é 404 quando nenhum livro encontrado\", function () {",
							"        pm.response.to.have.status(404);",
							"    });",
							"}",
							""
						],
						"type": "text/javascript",
						"packages": {},
						"requests": {}
					}
				}
			],
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "http://localhost:3000/api/livros?query=sigmund+freud&maxResults=1&traduzir=true",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"api",
						"livros"
					],
					"query": [
						{
							"key": "query",
							"value": "sigmund+freud"
						},
						{
							"key": "maxResults",
							"value": "1"
						},
						{
							"key": "traduzir",
							"value": "true"
						}
					]
				}
			},
			"response": []
		}
	]
}