import express, { Express, Response, Request } from "express";
import knex from "knex";
import { ArticlesModel, Articles } from "./models/articles";
import { Model, NotFoundError } from "objection";

const PORT = 3000;

const app: Express = express();
const knexInstance = knex({
  client: "postgresql",
  connection: {
    database: "my_db",
    user: "username",
    password: "password",
  },
});

interface IParams {
  id: string;
}

Model.knex(knexInstance);

app.use(express.json());

app.get("/articles", async (_, res: Response) => {
  const articles = await ArticlesModel.query();
  return res.json(articles);
});

app.get("/articles/:id", async (req: Request<IParams>, res: Response) => {
  const id = +req.params.id;
  const article = await ArticlesModel.query().findById(id).throwIfNotFound();
  return res.json(article);
});

app.post("/articles", async (req: Request<{}, {}, Articles>, res: Response) => {
  const body = req.body;
  const article = await ArticlesModel.query().insert(body).returning("*");
  return res.json(article);
});

app.patch(
  "/articles/:id",
  async (req: Request<IParams, {}, Partial<Articles>>, res: Response) => {
    const body = req.body;
    const id = +req.params.id;
    const articles = await ArticlesModel.query()
      .where({ id })
      .patch(body)
      .throwIfNotFound()
      .returning("*");
    return res.json(articles);
  }
);

app.delete("/articles/:id", async (req: Request<IParams>, res: Response) => {
  const id = +req.params.id;
  await ArticlesModel.query()
    .where({ id })
    .del()
    .throwIfNotFound()
    .returning("*");
  return res.json({ message: "Success delete articles" });
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
