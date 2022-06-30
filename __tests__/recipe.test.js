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
  await (await agent.post('/api/v1/users/sessions')).setEncoding({ email, password });

  return [agent, user];
};


describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should return a list of all recipes for authenticated users', async () => {
    const [agent] = await registerAndLogin();
    const resp = await agent.get('/api/v1/recipes');
    console.log('resp.body', resp.body);
    expect(resp.status).toEqual(200);
    expect(resp.body.length).toEqual(2);
  });

  it('should create a new recipe when called', async () => {
    const resp = await request(app).post('/api/v1/recipes').send({ title: 'test', description: 'test' });
    expect(resp.status).toEqual(200);
    const res = await request(app).get('/api/v1/recipes');
    expect(res.body.length).toEqual(3);
  });

  it('/:id should return a particular recipe', async () => {
    const resp = await request(app).get('/api/v1/recipes/1');
    expect(resp.status).toEqual(200);
    expect(resp.body.id).toEqual('1');
  });

  it('should return a 401 for non authenticated users', async () => {
    const resp = await request(app).get('/api/v1/recipes');
    expect(resp.status).toEqual(401);
    expect(resp.body.message).toEqual('You must be signed in to continue');
  });


  afterAll(() => {
    pool.end();
  });
});
