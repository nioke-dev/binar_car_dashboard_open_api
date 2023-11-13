import { ArticlesModel, Articles } from "../models/articles";

export default class ArticlesRepository {
  async getMany() {
    const articles = await ArticlesModel.query();
    return articles;
  }

  async getOne(id: number) {
    const article = await ArticlesModel.query().findById(id).throwIfNotFound();
    return article;
  }

  async create(body: Articles) {
    const article = await ArticlesModel.query().insert(body).returning("*");
    return article;
  }

  async update(id: number, body: Partial<Articles>) {
    const article = await ArticlesModel.query()
      .where({ id })
      .patch(body)
      .throwIfNotFound()
      .returning("*");
    return article;
  }

  async del(id: number) {
    const article = await ArticlesModel.query()
      .where({ id })
      .del()
      .throwIfNotFound()
      .returning("*");
    return article;
  }
}
