import { Request, Response } from "express";
import IController from "./ControllerInterface";
import UserService from "../services/UserService";

class UserController implements IController {
  async index(req: Request, res: Response): Promise<Response> {
    // get all users
    try {
      const users = await UserService.getAllUsers();
      return res.json({
        data: users,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }
  create(req: Request, res: Response): Response {
    throw new Error("Feature Not Found.");
  }
  show(req: Request, res: Response): Response {
    throw new Error("Feature Not Found.");
  }
  update(req: Request, res: Response): Response {
    throw new Error("Feature Not Found.");
  }
  delete(req: Request, res: Response): Response {
    throw new Error("Feature Not Found.");
  }
}

export default new UserController();
