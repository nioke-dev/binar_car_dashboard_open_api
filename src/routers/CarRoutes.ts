import BaseRoutes from "./BaseRouter";
import { auth } from "../middlewares/AuthMiddleware";

// Controllers
import CarController from "../controllers/CarController";

class CarRoutes extends BaseRoutes {
  public routes(): void {
    /**
     * @openapi
     *
     * /api/cars/:
     *  get:
     *      summary: Get list of cars
     *      description: Get all cars data
     *      tags:
     *          - Cars
     *      responses:
     *          '200':
     *              description: Get All Data Success
     *              content:
     *                  application/json:
     *                      example:
     *                          - id: "7a0dfec0-db8d-4695-8434-45193e9feac4"
     *                            plate: "DBH-3491"
     *                            manufacture: "Ford"
     *                            image: "https://i.ibb.co/58nQ0C0/car01-min.jpg"
     *                            model: "F150"
     *                            type: "Sedan"
     *                            description: "Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter."
     *                            transmission: "Automatic"
     *                            capacity: 2
     *                            rentPerDay: "200000"
     *                            availableAt: "2023-11-25T07:49:05.563Z"
     *                            available: true
     *                            year: 2022
     *                            options:
     *                              - "Cruise Control"
     *                              - "Tinted Glass"
     *                              - "Tinted Glass"
     *                              - "Tinted Glass"
     *                            specs:
     *                              - "Brake assist"
     *                              - "Brake assist"
     *                              - "Brake assist"
     *                            createdBy: "2625c868-55d3-4655-a3b1-f1e4416b39ce"
     *                            updatedBy: "2625c868-55d3-4655-a3b1-f1e4416b39ce"
     *                            deletedBy: null
     *                            deletedAt: null
     *                            created_at: "2023-11-23T15:08:05.900Z"
     *                            updated_at: "2023-11-23T15:08:05.900Z"
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

    this.router.get("/", auth, CarController.index);

    /**
     * @openapi
     *
     * /api/cars/NoToken:
     *  get:
     *      summary: Get list of cars Without Token
     *      description: Get all cars data
     *      tags:
     *          - Cars
     *      responses:
     *          '200':
     *              description: Get All Data Success
     *              content:
     *                  application/json:
     *                      example:
     *                          - id: "7a0dfec0-db8d-4695-8434-45193e9feac4"
     *                            plate: "DBH-3491"
     *                            manufacture: "Ford"
     *                            image: "https://i.ibb.co/58nQ0C0/car01-min.jpg"
     *                            model: "F150"
     *                            type: "Sedan"
     *                            description: "Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter."
     *                            transmission: "Automatic"
     *                            capacity: 2
     *                            rentPerDay: "200000"
     *                            availableAt: "2023-11-25T07:49:05.563Z"
     *                            available: true
     *                            year: 2022
     *                            options:
     *                              - "Cruise Control"
     *                              - "Tinted Glass"
     *                              - "Tinted Glass"
     *                              - "Tinted Glass"
     *                            specs:
     *                              - "Brake assist"
     *                              - "Brake assist"
     *                              - "Brake assist"
     *                            createdBy: "2625c868-55d3-4655-a3b1-f1e4416b39ce"
     *                            updatedBy: "2625c868-55d3-4655-a3b1-f1e4416b39ce"
     *                            deletedBy: null
     *                            deletedAt: null
     *                            created_at: "2023-11-23T15:08:05.900Z"
     *                            updated_at: "2023-11-23T15:08:05.900Z"
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
    this.router.get("/NoToken", CarController.index);

    /**
     * @openapi
     *
     * /api/cars/:
     *  post:
     *      summary: Create a new Car
     *      description: Create a new Car to Database
     *      tags:
     *          - Cars
     *      requestBody:
     *          required: true
     *          content:
     *              application/json:
     *                  example:
     *                      plate: "BHD-3923"
     *                      manufacture: "Lincoln"
     *                      model: "Navigator"
     *                      image: "https://i.ibb.co/J51QXrr/car05-min.jpg"
     *                      rentPerDay: 200000
     *                      capacity: 2
     *                      description: "Body color sill extension. Torsion beam rear suspension w/stabilizer bar. Front & rear passenger folding assist grips."
     *                      availableAt: "2023-10-28T01:00:05.563Z"
     *                      transmission: "Automatic"
     *                      available: false
     *                      type: "Minivan"
     *                      year: 2020
     *                      options:
     *                          - "CD (Multi Disc)"
     *                          - "Cruise Control"
     *                          - "Power Locks"
     *                          - "Alloy Wheels"
     *                          - "Tow Package"
     *                      specs:
     *                          - "Body color sill extension"
     *                          - "Torsion beam rear suspension w/stabilizer bar"
     *                          - "Front & rear passenger folding assist grips"
     *                          - "Electronic control braking (ECB)"
     *                          - "Black windshield molding"
     *      responses:
     *          '200':
     *              description: Car Created Successfully
     *              content:
     *                  application/json:
     *                      example:
     *                          - id: "7a0dfec0-db8d-4695-8434-45193e9feac4"
     *                            plate: "DBH-3491"
     *                            manufacture: "Ford"
     *                            image: "https://i.ibb.co/58nQ0C0/car01-min.jpg"
     *                            model: "F150"
     *                            type: "Sedan"
     *                            description: "Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter."
     *                            transmission: "Automatic"
     *                            capacity: 2
     *                            rentPerDay: "200000"
     *                            availableAt: "2023-11-25T07:49:05.563Z"
     *                            available: true
     *                            year: 2022
     *                            options:
     *                              - "Cruise Control"
     *                              - "Tinted Glass"
     *                              - "Tinted Glass"
     *                              - "Tinted Glass"
     *                            specs:
     *                              - "Brake assist"
     *                              - "Brake assist"
     *                              - "Brake assist"
     *                            createdBy: "2625c868-55d3-4655-a3b1-f1e4416b39ce"
     *                            updatedBy: "2625c868-55d3-4655-a3b1-f1e4416b39ce"
     *                            deletedBy: null
     *                            deletedAt: null
     *                            created_at: "2023-11-23T15:08:05.900Z"
     *                            updated_at: "2023-11-23T15:08:05.900Z"
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

    this.router.post("/", auth, CarController.create);

    /**
     * @openapi
     *
     * /api/cars/{id}:
     *  get:
     *      summary: Get Car by ID
     *      description: Get Car By Id from Database
     *      tags:
     *          - Cars
     *      parameters:
     *          - in: path
     *            name: id
     *            required: true
     *            description: ID of the car to get
     *            schema:
     *              type: string
     *              example: 5f5965e5-aa38-4de8-96dd-ae0d66147b10
     *      responses:
     *          '200':
     *              description: Successfully Get Car Data
     *              content:
     *                  application/json:
     *                      example:
     *                          - id: "7a0dfec0-db8d-4695-8434-45193e9feac4"
     *                            plate: "DBH-3491"
     *                            manufacture: "Ford"
     *                            image: "https://i.ibb.co/58nQ0C0/car01-min.jpg"
     *                            model: "F150"
     *                            type: "Sedan"
     *                            description: "Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter."
     *                            transmission: "Automatic"
     *                            capacity: 2
     *                            rentPerDay: "200000"
     *                            availableAt: "2023-11-25T07:49:05.563Z"
     *                            available: true
     *                            year: 2022
     *                            options:
     *                              - "Cruise Control"
     *                              - "Tinted Glass"
     *                              - "Tinted Glass"
     *                              - "Tinted Glass"
     *                            specs:
     *                              - "Brake assist"
     *                              - "Brake assist"
     *                              - "Brake assist"
     *                            createdBy: "2625c868-55d3-4655-a3b1-f1e4416b39ce"
     *                            updatedBy: "2625c868-55d3-4655-a3b1-f1e4416b39ce"
     *                            deletedBy: null
     *                            deletedAt: null
     *                            created_at: "2023-11-23T15:08:05.900Z"
     *                            updated_at: "2023-11-23T15:08:05.900Z"
     *          '404':
     *              description: Car not found with the given ID
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

    this.router.get("/:id", auth, CarController.show);

    /**
     * @openapi
     *
     * /api/cars/{id}:
     *  put:
     *      summary: Update Car by ID
     *      description: Update Car By Id to Database
     *      tags:
     *          - Cars
     *      parameters:
     *          - in: path
     *            name: id
     *            required: true
     *            description: ID of the car to be updated
     *            schema:
     *              type: string
     *              example: 9d04d9fa-9997-4c4b-8313-bef2f3266557
     *      requestBody:
     *          required: true
     *          content:
     *              application/json:
     *                  example:
     *                      plate: "Ford-242023"
     *                      manufacture: "BMW Ford"
     *                      model: "M7"
     *                      image: "https://i.ibb.co/YpMhjY6/car22-min.jpg"
     *                      rentPerDay: 350000
     *                      capacity: 4
     *                      description: "Pwr front vented disc/rear drum brakes. Pwr windows -inc: 1-touch open/close. Cloth covered headliner."
     *                      availableAt: "2023-11-28T01:00:05.563Z"
     *                      transmission: "Automatic"
     *                      available: false
     *                      type: "Coups"
     *                      year: 2022
     *                      options:
     *                          - "Memory Seats"
     *                          - "Power Locks"
     *                          - "Fog Lights"
     *                          - "Alloy Wheels"
     *                          - "Tinted Glass"
     *                      specs:
     *                          - "Pwr front vented disc/rear drum brakes"
     *                          - "Pwr windows -inc: 1-touch open/close"
     *                          - "Front & rear passenger folding assist grips"
     *                          - "Cloth covered headliner"
     *                          - "Black windshield molding"
     *      responses:
     *          '200':
     *              description: Car Updated Successfully
     *              content:
     *                  application/json:
     *                      example:
     *                          - id: "7a0dfec0-db8d-4695-8434-45193e9feac4"
     *                            plate: "DBH-3491"
     *                            manufacture: "Ford"
     *                            image: "https://i.ibb.co/58nQ0C0/car01-min.jpg"
     *                            model: "F150"
     *                            type: "Sedan"
     *                            description: "Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter."
     *                            transmission: "Automatic"
     *                            capacity: 2
     *                            rentPerDay: "200000"
     *                            availableAt: "2023-11-25T07:49:05.563Z"
     *                            available: true
     *                            year: 2022
     *                            options:
     *                              - "Cruise Control"
     *                              - "Tinted Glass"
     *                              - "Tinted Glass"
     *                              - "Tinted Glass"
     *                            specs:
     *                              - "Brake assist"
     *                              - "Brake assist"
     *                              - "Brake assist"
     *                            createdBy: "2625c868-55d3-4655-a3b1-f1e4416b39ce"
     *                            updatedBy: "2625c868-55d3-4655-a3b1-f1e4416b39ce"
     *                            deletedBy: null
     *                            deletedAt: null
     *                            created_at: "2023-11-23T15:08:05.900Z"
     *                            updated_at: "2023-11-23T15:08:05.900Z"
     *          '404':
     *              description: Car not found with the given ID
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

    this.router.put("/:id", auth, CarController.update);

    /**
     * @openapi
     *
     * /api/cars/{id}:
     *  delete:
     *      summary: Delete Car by ID
     *      description: Delete Car By Id from Database
     *      tags:
     *          - Cars
     *      parameters:
     *          - in: path
     *            name: id
     *            required: true
     *            description: ID of the car to delete
     *            schema:
     *              type: string
     *              example: 5f5965e5-aa38-4de8-96dd-ae0d66147b10
     *      responses:
     *          '204':
     *              description: Car deleted successfully
     *          '404':
     *              description: Car not found with the given ID
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

    this.router.delete("/:id", auth, CarController.delete);
  }
}

export default new CarRoutes().router;
