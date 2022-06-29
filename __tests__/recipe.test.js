const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should return a list of all recipes', () => {
    const resp = await request(app).get('/api/v1/recipes');
    expect(resp.status).toEqual(200);
    expect(resp.body.length).toEqual(2);
  });

  afterAll(() => {
    pool.end();
  });
});
