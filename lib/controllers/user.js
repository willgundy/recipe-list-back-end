const { Router } = require('express');
const UserService = require('../services/UserService');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;
const IS_DEPLOYED = process.env.NODE_ENV === 'production';

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const newUser = await UserService.create(req.body);
      res.json(newUser);
    } catch(error) {
      next(error);
    }
  })
  
  .post('/sessions', async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const token = await UserService.signIn({ email, password });
      res.cookie(process.env.COOKIE_NAME, token, {
        httpOnly: true,
        secure: IS_DEPLOYED,
        sameSite: IS_DEPLOYED ? 'none' : 'strict',
        maxAge: ONE_DAY_IN_MS
      }).json({ message: 'Signed in successfully!' });
    } catch (error) {
      next (error);
    }
  })
  
  .get('/me', async (req, res) => {
    console.log(req);
    res.json(req.user);
  });
