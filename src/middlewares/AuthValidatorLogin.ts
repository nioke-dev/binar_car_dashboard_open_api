import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

const validateLogin = [
  check("email")
    .isEmail()
    .withMessage("Invalid Email Format")
    .isString()
    .withMessage("Email Format Must Be String"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req); // get the error

    // Jika ada error
    if (!errors.isEmpty()) {
      return res.status(422).send({ errors: errors.array() });
    }

    next();
  },
];

export default validateLogin;
