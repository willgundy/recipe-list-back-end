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

  static async getUserByEmail(email) {
    const { rows } = await pool.query(
      `
      SELECT *
      FROM users
      WHERE email=$1
      `,
      [email]
    );
    return new User(rows[0]);
  }

  get passwordHash() {
    return this.#passwordHash;
  }
};


