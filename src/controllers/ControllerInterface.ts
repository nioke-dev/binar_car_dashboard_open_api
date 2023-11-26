import { Request, Response } from "express";

interface IController {
  index(req: Request, res: Response): Response | Promise<Response>; //untuk menampilkan list data
  create(req: Request, res: Response): Response | Promise<Response>; //untuk menbuat list data
  show(req: Request, res: Response): Response | Promise<Response>; //untuk menampilkan satu data
  update(req: Request, res: Response): Response | Promise<Response>; //untuk update data
  delete(req: Request, res: Response): Response | Promise<Response>; //untuk hapus list data
}

export default IController;
