import { Express, Request, Response } from "express";
import AriclesService from "../services/articles";
import { Articles } from "../models/articles";

interface IParams {
  id: string;
}

export default class ArticleController {
  app: Express;
  service: AriclesService;

  constructor(app: Express) {
    this.app = app;
    this.service = new AriclesService();

    this.app.get("/articles", this.getMany);
    this.app.get("/articles/:id", this.getOne);
    this.app.post("/articles", this.create);
    this.app.patch("/articles/:id", this.update);
    this.app.delete("/articles/:id", this.del);
  }

  async getMany(_req: Request, res: Response) {
    const result = await this.service.getMany();
    return res.status(200).json(result);
  }

  async getOne(req: Request, res: Response) {
    const id = +req.params.id;
    const result = await this.service.getOne(id);
    return res.status(200).json(result);
  }

  async create(req: Request<{}, {}, Articles>, res: Response) {
    const body = req.body;
    const result = await this.service.create(body);
    return res.status(200).json(result);
  }

  async update(req: Request<IParams, {}, Partial<Articles>>, res: Response) {
    const body = req.body;
    const id = +req.params.id;
    const result = await this.service.update(id, body);
    return res.status(200).json(result);
  }

  async del(req: Request<IParams>, res: Response) {
    const id = +req.params.id;
    const result = await this.service.del(id);
    return res.status(200).json(result);
  }
}
