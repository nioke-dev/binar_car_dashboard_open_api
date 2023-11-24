// articlesRoutes.ts
import { Express } from "express";
import UsersController from "../controller/users";
import { authenticateToken } from "../middleware/authMiddleware";

export default function setupUsersRoutes(app: Express) {
  const usersController = new UsersController(app);

  app.get("/userHome", (req, res) => {
    usersController.getHome(req, res);
  });
  app.post("/login", (req, res) => {
    usersController.postLogin(req, res);
  });
  app.get("/who-am-i", authenticateToken, (req, res) => {
    usersController.WhoAmI(req, res);
  });
}
