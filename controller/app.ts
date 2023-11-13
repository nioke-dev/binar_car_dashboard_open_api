import { Express, Request, Response } from "express";

export default class AppController {
  app: Express;

  constructor(app: Express) {
    this.app = app;
  }

  init() {
    this.app.get("/", this.index);
  }

  index(req: Request, res: Response) {
    res.render("index");
  }
}
