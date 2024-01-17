import { Request, Response } from "express";
import IController from "./ControllerInterface";
import CarService from "../services/CarService";

class CarController implements IController {
  async index(req: Request, res: Response): Promise<Response> {
    try {
      const { inputTanggal, waktuJemput, jumlahPenumpang } = req.query;
      const cars = await CarService.getAllCars({
        inputTanggal: inputTanggal as string,
        waktuJemput: inputTanggal as string,
        jumlahPenumpang: jumlahPenumpang as string,
      });

      return res.status(200).json(cars);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    const carData = {
      ...req.body,
      specs: JSON.stringify(req.body.specs),
      options: JSON.stringify(req.body.options),
    };

    try {
      const newCar = await CarService.createCar(carData, req.app.locals.credential.id);
      return res.status(200).send(newCar);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const updatedCarData = {
      ...req.body,
      specs: JSON.stringify(req.body.specs),
      options: JSON.stringify(req.body.options),
    };

    try {
      const updatedCar = await CarService.updateCar(id, updatedCarData, req.app.locals.credential.id);
      if (!updatedCar) {
        return res.status(404).json({ error: 'Car not found' });
      }
      return res.status(200).send(updatedCar);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const car = await CarService.getCarById(id);
  
      if (!car) {
        return res.status(404).json({ message: 'Data not found' });
      }
  
      return res.status(200).json(car);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
  
    try {
      const car = await CarService.deleteCar(id, req.app.locals.credential.id);
  
      if (!car) {
        return res.status(404).json({ message: 'Data not found' });
      }
  
      return res.status(204).json({ message: 'Berhasil hapus data' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new CarController();
