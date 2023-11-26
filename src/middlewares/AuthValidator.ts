import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

const validate = [
  check("email")
    .isEmail()
    .withMessage("Invalid Email Format")
    .isString()
    .withMessage("Email Format Must Be String")
    .normalizeEmail(),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/)
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req); // get the error

    // if error found
    if (!errors.isEmpty()) {
      return res.status(422).send({ errors: errors.array() });
    }

    next();
  },
];

export default validate;
