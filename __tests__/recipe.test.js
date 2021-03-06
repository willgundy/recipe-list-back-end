const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should return a list of all recipes', async () => {
    const resp = await request(app).get('/api/v1/recipes');
    expect(resp.status).toEqual(200);
    expect(resp.body.length).toEqual(2);
  });

  it('should create a new recipe when called', async () => {
    const resp = await request(app)
      .post('/api/v1/recipes')
      .send({ title: 'test', description: 'test' });
    expect(resp.status).toEqual(200);
    const res = await request(app).get('/api/v1/recipes');
    expect(res.body.length).toEqual(3);
  });

  it('/:id should return a particular recipe', async () => {
    const resp = await request(app).get('/api/v1/recipes/1');
    expect(resp.status).toEqual(200);
    expect(resp.body.id).toEqual('1');
  });

  it('delete should delete a particular recipe', async () => {
    const resp = await request(app).delete('/api/v1/recipes/1');
    expect(resp.status).toEqual(200);
    expect(resp.body.id).toEqual('1');
    const res = await request(app).get('/api/v1/recipes');
    expect(res.body.length).toEqual(1);
  });

  it('update recipe should update a particular recipe', async () => {
    const resp = await request(app)
      .put('/api/v1/recipes/2')
      .send({ title: 'title', description: 'description' });
    console.log(resp.body);
    expect(resp.status).toEqual(200);
    expect(resp.body.id).toEqual('2');
    const res = await request(app).get('/api/v1/recipes');
    expect(res.body.length).toEqual(2);
  });

  afterAll(() => {
    pool.end();
  });
});
