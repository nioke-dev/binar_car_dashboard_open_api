import { Articles } from "../models/articles";
import ArticlesRepository from "../repositories/articles";

export default class ArticlesServices {
  repository: ArticlesRepository;

  constructor() {
    this.repository = new ArticlesRepository();
  }

  async getMany() {
    return await this.repository.getMany();
  }

  async getOne(id: number) {
    return await this.repository.getOne(id);
  }

  async create(body: Articles) {
    return await this.repository.create(body);
  }

  async update(id: number, body: Partial<Articles>) {
    return await this.repository.update(id, body);
  }

  async del(id: number) {
    return await this.repository.del(id);
  }
}
