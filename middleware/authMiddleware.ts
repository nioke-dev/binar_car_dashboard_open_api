import express, { Express, Response, Request, NextFunction } from "express";
import { UsersModel, Users } from "../models/users";
import jwt from "jsonwebtoken";

const TOKEN_SECRET = "secret_token";

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split("")[1]; // Leave the Bearer

  if (!token) {
    return res.sendStatus(401).json({ message: "Invalid Token" });
  }

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403).json({ message: "Forbidden" });
    }

    req.user = user as Users;
    next();
  });
}
