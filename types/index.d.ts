import { Users } from "../models/users";
import { Request } from "express";

declare module "express" {
  export interface Request {
    user?: Users;
  }
}
