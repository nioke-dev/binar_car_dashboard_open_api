import CarRepository from "../repositories/CarRepository";

class CarService {
    async getAllCars(queryParams: {
        inputTanggal?: string;
        waktuJemput?: string;
        jumlahPenumpang?: string;
    }) {
        const cars = await CarRepository.getAllCars(queryParams);
        return cars;
    }

    async createCar(carData: any, createdBy: string) {
        const newCar = await CarRepository.createCar({ ...carData, createdBy, updatedBy: createdBy });
        return newCar;
    }

    async updateCar(id: string, carData: any, updatedBy: string) {
        const updatedCar = await CarRepository.updateCar(id, { ...carData, updatedBy });
        return updatedCar;
    }

    async getCarById(id: string) {
        const car = await CarRepository.getCarById(id);
        return car;
    }

    async deleteCar(id: string, deletedBy: string) {
        const car = await CarRepository.deleteCar(id, deletedBy);
        return car;
    }
}

export default new CarService();
