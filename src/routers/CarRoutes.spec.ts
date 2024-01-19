import { describe, it, expect, beforeAll } from "vitest";
import App from "../server";
import supertest from "supertest";
// import { login } from "../utils/test"
// import globalToken from './AuthRoutes.spec';

let globalToken = "";
let addedCarId = "";

describe("test Cars API:/api/cars", () => {
  const app = new App().app;

  beforeAll(async () => {
    // Lakukan pendaftaran dan login untuk mendapatkan token
    const registerResponse = await supertest(app)
      .post("/api/auth/register")
      .send({
        email: "nioke8990@gmail.com",
        password: "rahasia",
      });

    expect(registerResponse.status).toBe(201);
    expect(registerResponse.body).toHaveProperty(
      "message",
      "Registrasi Sukses!"
    );

    const loginResponse = await supertest(app).post("/api/auth/login").send({
      email: "fawwazi12@gmail.com",
      password: "fawwazi123",
    });

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body).toMatchObject({
      token: expect.any(String),
    });

    globalToken = loginResponse.body.token;
  });

  it("should not able to create cars if not logged in", async () => {
    const response = await supertest(app).post("/api/cars");
    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized: No token provided");
  });

  it("should get list of cars", async () => {
    const response = await supertest(app).get("/api/cars");
    expect(response.status).toBe(200);

    const cars = response.body;

    cars.forEach((car: any) => {
      expect(car).toHaveProperty("plate");
      expect(car).toHaveProperty("manufacture");
      expect(car).toHaveProperty("image");
      expect(car).toHaveProperty("type");
      expect(car).toHaveProperty("availableAt");
      expect(car).toHaveProperty("rentPerDay");
    });
  });

  it("should add a new car to database", async () => {
    const carData = {
      plate: "BDH-39",
      manufacture: "Lincoln",
      model: "Navigator",
      image: "https://i.ibb.co/J51QXrr/car05-min.jpg",
      rentPerDay: 200000,
      capacity: 2,
      description:
        "Body color sill extension. Torsion beam rear suspension w/stabilizer bar.",
      availableAt: "2023-10-28T01:00:05.563Z",
      transmission: "Automatic",
      available: false,
      type: "Minivan",
      year: 2020,
      options: [
        "CD (Multi Disc)",
        "Cruise Control",
        "Power Locks",
        "Alloy Wheels",
        "Tow Package",
      ],
      specs: [
        "Body color sill extension",
        "Torsion beam rear suspension w/stabilizer bar",
        "Front & rear passenger folding assist grips",
        "Electronic control braking (ECB)",
        "Black windshield molding",
      ],
    };

    const response = await supertest(app)
      .post("/api/cars")
      .set("Authorization", `Bearer ${globalToken}`)
      .send(carData);

    expect(response.status).toBe(200);

    await new Promise((resolve) => setTimeout(resolve, 2500));

    const addedCarResponse = await supertest(app)
      .get(`/api/cars/${response.body.id}`)
      .set("Authorization", `Bearer ${globalToken}`);

    addedCarId = addedCarResponse.body.id;

    console.log(addedCarResponse.body);

    // expect(addedCarResponse.body.plate).toBe("BDH-39");
    // expect(addedCarResponse.body.manufacture).toBe("Lincoln");
    // expect(addedCarResponse.body.model).toBe("Navigator");
  });

  it("should show car by id", async () => {
    if (!addedCarId) {
      throw new Error("Id mobil belum ada woy!");
    }

    const response = await supertest(app)
      .get(`/api/cars/${addedCarId}`)
      .set("Authorization", `Bearer ${globalToken}`);

    expect(response.status).toBe(200);

    const car = response.body;
    expect(car).toHaveProperty("id", addedCarId);
    expect(car).toHaveProperty("plate");
    expect(car).toHaveProperty("manufacture");
    expect(car).toHaveProperty("image");
  });

  it("should update car by id", async () => {
    if (!addedCarId) {
      throw new Error("Id belum ditambahkan woyy");
    }

    const updatedCarData = {
      plate: "Ford-55",
      manufacture: "BMW Ford",
      model: "M7",
      image: "https://i.ibb.co/YpMhjY6/car22-min.jpg",
      rentPerDay: 350000,
      capacity: 4,
      description:
        "Pwr front vented disc/rear drum brakes. Pwr windows -inc: 1-touch open/close. Cloth covered headliner.",
      availableAt: "2023-11-28T01:00:05.563Z",
      transmission: "Automatic",
      available: false,
      type: "Coups",
      year: 2022,
      options: [
        "Memory Seats",
        "Power Locks",
        "Fog Lights",
        "Alloy Wheels",
        "Tinted Glass",
      ],
      specs: [
        "Pwr front vented disc/rear drum brakes",
        "Pwr windows -inc: 1-touch open/close",
        "Front & rear passenger folding assist grips",
        "Cloth covered headliner",
        "Black windshield molding",
      ],
    };

    const response = await supertest(app)
      .put(`/api/cars/${addedCarId}`) // <-- Perubahan di sini
      .set("Authorization", `Bearer ${globalToken}`)
      .send(updatedCarData);

    expect(response.status).toBe(200);
    const updatedCar = response.body;

    expect(updatedCar).toMatchObject({
      plate: updatedCarData.plate,
      manufacture: updatedCarData.manufacture,
      model: updatedCarData.model,
      image: updatedCarData.image,
      rentPerDay: updatedCarData.rentPerDay.toString(), // Perhatikan konversi ke string
      capacity: updatedCarData.capacity,
      description: updatedCarData.description,
      availableAt: updatedCarData.availableAt,
      transmission: updatedCarData.transmission,
      available: updatedCarData.available,
      type: updatedCarData.type,
      year: updatedCarData.year,
      options: updatedCarData.options,
      specs: updatedCarData.specs,
    });

    // Opsional: Memeriksa keberadaan properti yang dihasilkan
    expect(updatedCar.created_at).toBeDefined();
    expect(updatedCar.updated_at).toBeDefined();
  });

  it("should delete car by id", async () => {
    if (!addedCarId) {
      throw new Error("Id belum ditambahkan woyy");
    }

    const response = await supertest(app)
      .delete(`/api/cars/${addedCarId}`)
      .set("Authorization", `Bearer ${globalToken}`);

    expect(response.status).toBe(204);

    // Pastikan mobil telah dihapus dengan mencoba mengambil data mobil yang telah dihapus
    const deletedCarResponse = await supertest(app)
      .get(`/api/cars/${addedCarId}`)
      .set("Authorization", `Bearer ${globalToken}`);

    expect(deletedCarResponse.status).toBe(404);
  });
});
