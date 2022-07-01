const { Router } = require('express');
const Recipe = require('../models/Recipe');
const authenticate = require('../middleware/authenticate');

module.exports = Router()

  .get('/', authenticate, async (req, res, next) => {
    try {
      const recipeList = await Recipe.getAll();
      res.json(recipeList);
    } catch (error) {
      next(error);
    }
  })

  .get('/:id', authenticate, async (req, res, next) => {
    try {
      const singleRecipe = await Recipe.getById(req.params.id);
      res.json(singleRecipe);
    } catch (error) {
      next(error);
    }
  })

  .post('/', authenticate, async (req, res, next) => {
    try {
      const newRecipe = await Recipe.create(req.body);
      res.json(newRecipe);
    } catch (error) {
      next(error);
    }
  })

  .delete('/:id', authenticate, async (req, res, next) => {
    try {
      const deletedRecipe = await Recipe.delete(req.params.id);
      res.json(deletedRecipe);
    } catch (error) {
      next(error);
    }
  })

  .put('/:id', authenticate, async (req, res, next) => {
    try {
      const updatedRecipe = await Recipe.updateById(req.params.id, req.body);
      res.json(updatedRecipe);
    } catch (error) {
      next(error);
    }
  });
