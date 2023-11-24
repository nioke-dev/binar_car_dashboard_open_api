// articlesRoutes.ts
import { Express } from "express";
import CarsController from "../controller/cars";

export default function setupArticleRoutes(app: Express) {
  const carsController = new CarsController(app);

  app.get("/", (req, res) => carsController.home(req, res));
  app.get("/cars", (req, res) => carsController.getMany(req, res));
  app.post("/cars", (req, res) => carsController.create(req, res));
  app.get("/cars/:id", (req, res) => carsController.getOne(req, res));
  app.patch("/cars/:id", (req, res) => carsController.patch(req, res));
  app.delete("/cars/:id", (req, res) => carsController.delete(req, res));
}
