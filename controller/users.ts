import { Express, Request, Response } from "express";
import { UsersModel, Users } from "../models/users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authenticateToken } from "../middleware/authMiddleware";

const TOKEN_SECRET = "secret_token";
export default class UsersController {
  app: Express;

  constructor(app: Express) {
    this.app = app;
  }

  async getHome(req: Request, res: Response) {
    res.send("Express + TypeScript Server");
  }

  async postLogin(req: Request<{}, {}, Omit<Users, "id">>, res: Response) {
    const { email, password } = req.body;

    // Get the users, if there is no user throw error not found
    const user = await UsersModel.query()
      .findOne({
        email: email,
      })
      .throwIfNotFound();

    // Check if the password correct
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ email: user.email, id: user.id }, TOKEN_SECRET, {
        expiresIn: "1h", // token will expire in one hour
      }); // an hour
      if (user.level === "super_admin") {
        // Tindakan yang sesuai
        return res.json({ Token: token });
      } else {
        return res.status(403).json({ message: "Anda Bukanlah Super Admin" });
      }
    }

    return res.sendStatus(400).json({ message: "Wrong credentials" });
  }

  async WhoAmI(req: Request, res: Response) {
    return res.json(req.user);
  }
}
