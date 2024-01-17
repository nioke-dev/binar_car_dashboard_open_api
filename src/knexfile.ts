import type { Knex } from "knex";
import path from 'path';
import dotenv from "dotenv";
// import { knexSnakeCaseMappers } from "objection";

// Update with your config settings.

dotenv.config({ path: path.resolve(__dirname, '../.env') });
console.log(process.env["DATABASE_URL"])

const config: { [key: string]: Knex.Config } = {

  development: {
    client: "postgresql",
    connection: process.env['DATABASE_URL'],
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: path.join(__dirname, 'database', 'migrations'),
    },
    seeds: {
      directory: path.join(__dirname, 'database', 'seeds'),
    },
  },

  production: {
    client: "pg",
    connection: process.env['DATABASE_URL'],
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

};

export default config;
