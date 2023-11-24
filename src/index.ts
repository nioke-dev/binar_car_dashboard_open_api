import express, { Express } from "express";
import knex from "knex";
import { Model } from "objection";
import setupUsersRoutes from "../routes/usersRoutes";
import setupCarsRoutes from "../routes/carsRoutes";
import setupOrdersRoutes from "../routes/ordersRoutes";

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
    setupUsersRoutes(app);
    setupCarsRoutes(app);
    setupOrdersRoutes(app);
  }
}

new App(app).app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
