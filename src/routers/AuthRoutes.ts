import BaseRoutes from "./BaseRouter";
import validate from "../middlewares/AuthValidator";
import { OAuth2Client, UserRefreshClient } from "google-auth-library";

// Controllers
import AuthController from "../controllers/AuthController";


const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET

const oAuth2Client = new OAuth2Client(
    CLIENT_ID,
    CLIENT_SECRET,
    'postmessage',
);

console.log(CLIENT_ID, CLIENT_SECRET)

class AuthRoutes extends BaseRoutes {
    public routes(): void {

        this.router.post('/google', async(req, res) => {
            const { tokens } = await oAuth2Client.getToken(req.body.code); // exchange code for tokens
            console.log(tokens);
            
            res.json(tokens);
        })

        this.router.post('/google/refresh-token', async(req,res) => {
            const user = new UserRefreshClient(
                CLIENT_ID,
                CLIENT_SECRET,
                req.body.refreshToken,
              );
            const { credentials } = await user.refreshAccessToken(); // optain new tokens
            res.json(credentials);
        })

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

        this.router.post("/login", validate, AuthController.login);

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