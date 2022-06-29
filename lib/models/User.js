const pool = require('../utils/pool');

module.exports = class User {
  id;
  email;
  #passwordHash;

  constructor(user) {
    this.id = user.id;
    this.email = user.email;
    this.#passwordHash = user.passwordHash;
  }

  static async create({ email, passwordHash }) {
    const { rows } = await pool.query(`insert into users (email, "passwordHash")
                                        values ($1, $2) returning *`, [email, passwordHash]);
    return new User(rows[0]);
  }

  static async getUserById(id) {
    const { rows } = await pool.query(
      `
      SELECT *
      FROM users
      WHERE id=$1
      `,
      [id]
    );
    return new User(rows[0]);
  }
};
