import { Express, Request, Response } from "express";
import { OrdersModel } from "../models/orders";

export default class OrdersController {
  app: Express;

  constructor(app: Express) {
    this.app = app;
  }

  async getOne(req: Request, res: Response) {
    const id = req.params.id;
    const order = await OrdersModel.query()
      .findById(id)
      .withGraphFetched("cars");
    res.status(200).json(order);
  }
}
