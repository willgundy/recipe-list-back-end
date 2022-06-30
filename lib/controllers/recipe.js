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

  .get('/:id', async (req, res, next) => {
    try {
      const singleRecipe = await Recipe.getById(req.params.id);
      res.json(singleRecipe);
    } catch (error) {
      next (error);
    }
  })
  
  .post('/', async (req, res, next) => {
    try {
      const newRecipe = await Recipe.create(req.body);
      res.json(newRecipe);
    } catch(error) {
      next(error);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const deletedRecipe = await Recipe.delete(req.params.id);
      res.json(deletedRecipe);
    } catch(error) {
      next(error);
    }
  });