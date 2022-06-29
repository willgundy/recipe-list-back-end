-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS recipes;


CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email VARCHAR NOT NULL UNIQUE,
  "passwordHash" VARCHAR NOT NULL
);

CREATE TABLE recipes (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR NOT NULL,
    description VARCHAR,
    "prepTime" INT,
    "cookTime" INT,
    "totalTime" INT,
    servings INT
);

INSERT INTO recipes (title, description, "prepTime", "cookTime", "totalTime", servings)
VALUES
  ('PB&J', 'The classic peanut butter and jelly sammy', 1, 2, 3, 1),
  ('Stir Fry Noodles', 'Chicken stir fry noodles with vegetables in a quick and easy stir fry sauce.', 15, 15, 30, 4);