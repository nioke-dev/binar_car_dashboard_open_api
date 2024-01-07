// TODO: Abstract Class
class Component {
    constructor() {
        if(this.constructor === Component) {
            throw new Error("Tidak bisa inisiasi objek dari abstract class")
        }
    }

    render() {
        throw new Error("Harus implementasi method ini!");
    }
}