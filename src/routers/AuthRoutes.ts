import BaseRoutes from "./BaseRouter";
import validate from "../middlewares/AuthValidator";
import validateLogin from "../middlewares/AuthValidatorLogin";
import { auth } from "../middlewares/AuthMiddleware";

// Controllers
import AuthController from "../controllers/AuthController";

class AuthRoutes extends BaseRoutes {
  public routes(): void {
    /**
     * @openapi
     *
     * /api/auth/register:
     *  post:
     *      summary: Register
     *      description: Register New User
     *      tags:
     *          - Auth
     *      produces:
     *          - application/json
     *      requestBody:
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties:
     *                          email:
     *                              type: string
     *                              format: email
     *                          password:
     *                              type: string
     *                              format: password
     *      responses:
     *          '201':
     *              description: Registration successful
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              message:
     *                                  type: string
     *                                  example: "Registration successful"
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

    this.router.post("/register", validate, AuthController.register);

    /**
     * @openapi
     *
     * /api/auth/login:
     *  post:
     *      summary: Login
     *      description: Login New User
     *      tags:
     *          - Auth
     *      produces:
     *          - application/json
     *      requestBody:
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties:
     *                          email:
     *                              type: string
     *                              format: email
     *                          password:
     *                              type: string
     *                              format: password
     *      responses:
     *          '200':
     *              description: Login successful
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              token:
     *                                  type: string
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

    this.router.post("/login", validateLogin, AuthController.login);

    /**
     * @openapi
     * components:
     *      securitySchemes:
     *          bearerAuth:
     *              type: http
     *              scheme: bearer
     *              bearerFormat: JWT
     */
  }
}

export default new AuthRoutes().router;
