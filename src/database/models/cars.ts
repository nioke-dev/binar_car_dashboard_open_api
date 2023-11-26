import { Model } from "objection";


class CarModel extends Model {
    id!: string;
    plate!: string;
    manufacture!: string;
    model!: string;
    image!: string;
    rentPerDay!: number;
    capacity!: number;
    description!: string;
    availableAt!: string;
    transmission!: string;
    available!: boolean;
    type!: string;
    year!: number;
    options!: string[]; 
    specs!: string[];
    createdBy!: string;
    updatedBy!: string;
    deletedBy!: string;
    deletedAt!: Date;


    static get tableName() {
        return "cars";
    }  

}

export default CarModel;