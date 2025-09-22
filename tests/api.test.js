// tests/api.test.js
const request = require('supertest');
const app = require('../src/app');
const store = require('../src/store');

beforeEach(() => store.clearAll());

describe('API Endpoints - Testes Unitários', () => {

  // Teste de health check
  test('GET /api/health deve retornar status ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
    expect(res.body).toHaveProperty('requestId');
  });

  // Teste criação de sensor
  test('POST /api/sensors deve criar um sensor', async () => {
    const sensor = {
      id: 's1',
      location: { lat: -3.7, lon: -38.5 },
      description: 'Sensor centro'
    };

    const res = await request(app).post('/api/sensors').send(sensor);
    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject(sensor);

    const list = await request(app).get('/api/sensors');
    expect(list.body.length).toBe(1);
  });

  // Teste leitura válida e alerta
  test('POST /api/readings deve criar leitura e gerar alerta se exceder threshold', async () => {
    // Adicionar sensor
    await request(app).post('/api/sensors').send({
      id: 's2',
      location: { lat: -3.7, lon: -38.5 }
    });

    // Criar leitura acima do limite de chuva
    const reading = { sensorId: 's2', rainfall_mm: 80 };
    const res = await request(app).post('/api/readings').send(reading);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('sensorId', 's2');

    // Verificar alerta gerado
    const alerts = await request(app).get('/api/alerts');
    expect(alerts.body.length).toBe(1);
    expect(alerts.body[0]).toHaveProperty('type', 'heavy_rain');
  });

  // Teste de erro - leitura inválida
  test('POST /api/readings inválido retorna 400 com formato padronizado', async () => {
    const res = await request(app)
      .post('/api/readings')
      .send({ sensorId: '', rainfall_mm: -5 });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toHaveProperty('code', 'VALIDATION_ERROR');
    expect(res.body.error).toHaveProperty('message');
    expect(Array.isArray(res.body.error.details)).toBe(true);
    expect(res.body.error.requestId).toBeDefined();
  });
});
