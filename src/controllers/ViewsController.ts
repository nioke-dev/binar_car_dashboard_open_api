import { Request, Response } from "express";
import CarsModel from "../database/models/cars";

class ViewsController {
  async index(req: Request, res: Response) {
    try {
      const { tipeDriver, tanggal, waktuJemput, jumlahpenumpang } = req.query;
      const key = `cars:${JSON.stringify(req.query)}`;

      const qCars = CarsModel.query();

      if (jumlahpenumpang) {
        qCars.where("capacity", ">", +jumlahpenumpang);
        qCars.whereRaw("TO_CHAR(\"availableAt\", 'YYYY-MM-DD') = ?", [tanggal]);
        qCars.whereRaw("TO_CHAR(\"availableAt\", 'HH24') > ?", [waktuJemput]);
      }

      const cars = await qCars.debug();
      console.log(cars);

      return res.render("cars", { cars });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }
}

export default new ViewsController();
