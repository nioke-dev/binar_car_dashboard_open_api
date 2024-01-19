import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class Authentication {
    public static passwordHash = (password: string) : Promise<string> => {
        return bcrypt.hash(password, 10);
    }

    public static passwordCompare = async (text: string, encryptedText: string) : Promise<boolean> => {
        const result = await bcrypt.compare(text, encryptedText);

        return result;
    }

    // generate berdasarkan id dan password
    public static generateToken = (id: string, password: string): string => {
        const secretKey: string = process.env.JWT_SECRET_KEY ?? "secret";
        
        const token : string = jwt.sign({ id, password }, secretKey);
        return token;
    }
}

export default Authentication;