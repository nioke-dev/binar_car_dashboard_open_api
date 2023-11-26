import { Model } from "objection";


class UserModel extends Model {
    id!: string;
    email!: string;
    password!: string;
    isAdmin!: boolean;
    created_at!: string;
    updated_at!: string;


    static get tableName() {
        return "users";
    }  

}

export default UserModel;