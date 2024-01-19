import CarModel from "../database/models/cars";

class CarRepository {
    async getAllCars(queryParams: {
        inputTanggal?: string;
        waktuJemput?: string;
        jumlahPenumpang?: string;
    }) {
        const qCars = CarModel.query().whereNull('deletedAt');

        if (queryParams.jumlahPenumpang) {
            qCars.where('capacity', '>=', +queryParams.jumlahPenumpang);
        }

        if (queryParams.inputTanggal) {
            qCars.whereRaw("to_char(\"availableAt\", 'YYYY-MM-DD') = ?", [queryParams.inputTanggal]);
        }

        if (queryParams.waktuJemput) {
            qCars.whereRaw("to_char(\"availableAt\", 'HH24:MI') <= ?", [queryParams.waktuJemput]);
        }

        const cars = await qCars.debug();
        return cars;
    }

    async createCar(carData: any) {
        const newCar = await CarModel.query().insert(carData);
        return newCar;
    }

    async updateCar(id: string, carData: any) {
        const updatedCar = await CarModel.query().patchAndFetchById(id, carData);
        return updatedCar;
    }

    async getCarById(id: string) {
        const car = await CarModel.query().findById(id).whereNull('deletedAt');
        return car;
    }

    async deleteCar(id: string, deletedBy: string) {
        const car = await CarModel.query().patchAndFetchById(id, {
        deletedBy,
        deletedAt: new Date(),
        });
    
        return car;
    }
}

export default new CarRepository();
