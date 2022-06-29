const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const mockUser = {
  email: 'test@test.com',
  password: '123456',
};

const createAndLogin = async (userProps = {}) => {
  const agent = request.agent(app);
  // const user = await 
};

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should create a new user', async () => {
    const resp = await request(app).post('/api/v1/users').send(mockUser);
    console.log(resp.body);
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      email: mockUser.email,
    });
  });

  it.skip('returns the current logged in user', async () => {

  });

  it.skip('should delete the session of the user', async () => {

  });

  it.skip('should sign in the user', async () => {

  });

  afterAll(() => {
    pool.end();
  });
});
