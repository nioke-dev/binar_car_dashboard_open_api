import UserRepository from "../repositories/UserRepository";
import Authentication from "../utils/Authentication";

class UserService {
    async registerUser(email: string, password: string, isAdmin?: boolean): Promise<void> {
        return UserRepository.createUser(email, password, isAdmin);
    }

    async loginUser(email: string, password: string): Promise<string | null> {
        const user = await UserRepository.findUserByEmail(email);

        if (user) {
            const compare = await Authentication.passwordCompare(password, user.password);

            if (compare) {
                const token = Authentication.generateToken(user.id, user.password);
                return token;
            }
        }

        return null;
    }
}

export default new UserService();
