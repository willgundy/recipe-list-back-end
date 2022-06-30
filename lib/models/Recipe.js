const recipe = require('../controllers/recipe');
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

  static async getById(id) {
    const { rows } = await pool.query(
      `
        SELECT *
        FROM recipes
        WHERE id=$1
        `,
      [id]
    );
    return new Recipe(rows[0]);
  }

  static async create({ title, description, prepTime, cookTime }) {
    const { rows } = await pool.query(
      `insert into recipes (title, description, "prepTime", "cookTime")
                                        values ($1, $2, $3, $4) returning *`,
      [title, description, prepTime, cookTime]
    );
    return new Recipe(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'delete from recipes where id=$1 returning *',
      [id]
    );
    return new Recipe(rows[0]);
  }

  static async updateById(id, attrs) {
    const updatedRecipe = await Recipe.getById(id);
    if (!updatedRecipe) return null;

    const { title, description, prepTime, cookTime } = {
      ...updatedRecipe,
      ...attrs,
    };
    const { rows } = await pool.query(
      `update recipes 
      set title=$1, description=$2, "prepTime"=$3, "cookTime"=$4
      where id=$5 
      returning *`,
      [title, description, prepTime, cookTime, id]
    );
    return new Recipe(rows[0]);
  }
};
