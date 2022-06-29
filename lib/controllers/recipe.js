const { Router } = require('express');
const Recipe = require('../models/Recipe');

module.exports = Router()

  .get('/', async (req, res, next) => {
    try {
      const recipeList = await Recipe.getAll();
      res.json(recipeList);
    } catch (error) {
      next (error);
    }
  })