import express, { Express } from "express";
import knex from "knex";
import { Model } from "objection";
import AppControler from "./controller/app";
import ArticleController from "./controller/articles";

const PORT = 3000;

const app: Express = express();

class App {
  app: Express;

  constructor(app: Express) {
    const knexInstance = knex({
      client: "postgresql",
      connection: {
        database: "my_db",
        user: "username",
        password: "password",
      },
    });

    Model.knex(knexInstance);

    this.app = app;

    this.app.use(express.json());
    this.app.set("view engine", "ejs");

    this.routes();
  }

  routes() {
    // Insert routes here
    new AppControler(app).init();
    new ArticleController(app).init();
  }
}

new App(app).app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
