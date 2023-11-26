import BaseRoutes from "./BaseRouter";
import { auth } from "../middlewares/AuthMiddleware";

// Controllers
import UserController from "../controllers/UserController";

class UserRoutes extends BaseRoutes {
  public routes(): void {
    /**
     * @openapi
     *
     * /api/users/user:
     *  post:
     *      summary: GetUsers
     *      description: Get All Users
     *      tags:
     *          - Users
     *      produces:
     *          - application/json
     *      requestBody:
     
     *      responses:
     *          '200':
     *              description: Get All Users successful
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              message:
     *                                  type: string
     *                                  example: "Get All Users successful"
     *          '500':
     *              description: Internal Server Error
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              message:
     *                                  type: string
     *                                  example: "Internal Server Error"
     */
    this.router.get("/user", auth, UserController.index);
    this.router.post("/user", auth, UserController.create);
    // this.router.get("/:id", CarController.show);
    // this.router.put("/:id", CarController.update);
    // this.router.delete("/:id", CarController.delete);
  }
}

export default new UserRoutes().router;
