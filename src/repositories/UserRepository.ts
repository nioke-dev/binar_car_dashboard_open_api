import UserModel from "../database/models/users";
import Authentication from "../utils/Authentication";

class UserRepository {
    async createUser(email: string, password: string, isAdmin?: boolean): Promise<void> {
        const hashedPassword: string = await Authentication.passwordHash(password);

        await UserModel.query().insert({
            email,
            password: hashedPassword,
            isAdmin: isAdmin || true,
        });
    }

    async findUserByEmail(email: string): Promise<any | null> {
        return UserModel.query().findOne({ email });
    }
}

export default new UserRepository();
