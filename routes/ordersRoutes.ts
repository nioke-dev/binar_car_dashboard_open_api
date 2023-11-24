// articlesRoutes.ts
import { Express } from "express";
import OrdersController from "../controller/orders";

export default function setupOrdersRoutes(app: Express) {
  const ordersController = new OrdersController(app);

  app.get("/orders", (req, res) => ordersController.getOne(req, res));
}
