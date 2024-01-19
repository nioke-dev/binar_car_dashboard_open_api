import BaseRoutes from "./BaseRouter";
import { auth } from "../middlewares/AuthMiddleware";

// Controllers
import UserController from "../controllers/UserController";


class UserRoutes extends BaseRoutes {
    public routes(): void {
        this.router.get("/", auth, UserController.index);
        this.router.post("/", auth, UserController.create);
        // this.router.get("/:id", CarController.show);
        // this.router.put("/:id", CarController.update);
        // this.router.delete("/:id", CarController.delete);
    }
}

export default new UserRoutes().router;