import dotenv from "dotenv";
const path = require("path");

dotenv.config({ path: path.join(__dirname, "..", ".env") });

import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import knex from "knex";
import { Model } from "objection";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./utils/swagger";

// Routers
import UserRoutes from "./routers/UserRoutes";
import AuthRoutes from "./routers/AuthRoutes";
import CarRoutes from "./routers/CarRoutes";
import ViewsController from "./controllers/ViewsController";

const knexInstance = knex({
  client: "postgresql",
  connection: {
    database: "my_db",
    user: "username",
    password: "password",
  },
});

// Connect ORM to Database
Model.knex(knexInstance);

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.plugins();
    this.routes();
  }

  protected plugins(): void {
    this.app.use(bodyParser.json());
    this.app.use(morgan("dev"));

    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(cors());

    this.app.use(express.urlencoded({ extended: true }));

    this.app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    this.app.set("view engine", "ejs");
    this.app.set("views", path.join(__dirname, "views"));

    this.app.use(express.static(path.join(__dirname, "../public")));
  }

  protected routes(): void {
    this.app.route("/").get((req: Request, res: Response) => {
      res.render("index");
    });

    // this.app.route("/cars").get((req: Request, res: Response) => {
    //   res.render("cars");
    // });

    this.app.route("/cars").get(ViewsController.index.bind(ViewsController));

    this.app.use("/api/users", UserRoutes);
    this.app.use("/api/auth", AuthRoutes);
    this.app.use("/api/cars", CarRoutes);
  }
}

const PORT: number = 3000;
const app = new App().app;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on ${PORT}`);
});
