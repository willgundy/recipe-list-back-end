const pool = require('../utils/pool');

module.exports = class Recipe {
  id;
  title;
  description;
  prepTime;
  cookTime;
  totalTime;
  servings;

  constructor(recipe) {
    this.id = recipe.id;
    this.title = recipe.title;
    this.description = recipe.description;
    this.prepTime = recipe.prepTime;
    this.cookTime = recipe.cookTime;
    this.totalTime = recipe.totalTime;
    this.servings = recipe.servings;
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
            SELECT *
            FROM  recipes
            `
    );
    return rows.map((row) => new Recipe(row));
  }

  static async create({ title, description, prepTime, cookTime }) {
    const { rows } = await pool.query(`insert into recipes (title, description, prepTime, cookTime)
                                        values ($1, $2, $3, $4) returning *`, [title, description, prepTime, cookTime]);
    return new Recipe(rows[0]);
  }
};
