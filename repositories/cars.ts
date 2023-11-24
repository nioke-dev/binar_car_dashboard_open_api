import { CarsModel, Cars } from "../models/cars";

export default class CarsRepository {

  async getMany() {
    const articles = await CarsModel.query();
    return articles;
  }

  async getOne(id: number) {
    const article = await CarsModel.query().findById(id).throwIfNotFound();
    return article;
  }

  async create(body: Cars) {
    const article = await CarsModel.query().insert(body).returning("*");
    return article;
  }

  async update(id: number, body: Partial<Cars>) {
    const article = await CarsModel.query()
      .where({ id })
      .patch(body)
      .throwIfNotFound()
      .returning("*");~
    return article;
  }

  async del(id: number) {
    const article = await CarsModel.query()
      .where({ id })
      .del()
      .throwIfNotFound()
      .returning("*");
    return article;
  }
}
