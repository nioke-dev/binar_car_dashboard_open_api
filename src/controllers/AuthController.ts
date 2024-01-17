import { Request, Response } from "express";
import UserService from "../services/UserService";



class AuthController {
    register = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { email, password, isAdmin } = req.body;

            await UserService.registerUser(email, password, isAdmin);

            return res.status(201).json({message: "Registrasi Sukses!"});
        } catch (error) {
            console.error("Error during registration:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    login = async(req: Request, res: Response): Promise<Response> => {
        
        try {
            const { email, password } = req.body;
        
            const token = await UserService.loginUser(email, password);

            if(token) {
                return res.send({ token });
            }
            return res.json({message: "Auth Failed"});
        } catch (error) {
            console.error("Error during login: ", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }

    }
    
}

export default new AuthController();