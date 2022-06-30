const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');


const mockUser = {
  email: 'testing@example.com',
  password: '123456'
};

const registerAndLogin = async (userProps = {}) => {
  const password = userProps.password ?? mockUser.password;

  const agent = request.agent(app);

  const user = await UserService.create({ ...mockUser, ...userProps });

  const { email } = user;
  await agent.post('/api/v1/users/sessions').send({ email, password });

  return [agent, user];
};

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should create a new user', async () => {
    const resp = await request(app).post('/api/v1/users').send(mockUser);
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
