class Car extends Component {
    constructor(filterResultSection) {
        super();
        this.filterResultSection = filterResultSection;
    }

    formatCurrencyID(priceRent) {
        const formattedCurrency = priceRent.toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        });

        return formattedCurrency;
    }


    render(availableCars) {
        
        if(availableCars.length === 0) {
            this.filterResultSection.innerHTML = '<h3 class=" text-center" style="margin-top: 30px">Belum ada mobil yang tersedia.</h3>'
        } else {
            this.filterResultSection.innerHTML = ''; // Reset UI
            const maxCardsPerRow = 3;
            for (let i = 0; i < availableCars.length; i += maxCardsPerRow) {
                const row = document.createElement('div');
                row.classList.add('row', 'mt-3');

                for (let j = i; j < i + maxCardsPerRow && j < availableCars.length; j++) {
                    const car = availableCars[j];
                    const imageURL = car.image;
                    const carType = car.type;
                    const description = car.description;
                    const capacity = car.capacity;
                    const transmission = car.transmission;
                    const carYear = car.year;
                    const carPriceRent = this.formatCurrencyID(car.rentPerDay);

                    const cardHTML =
                        `
                        <div class="col-md-4 mb-3">
                            <div class="card">
                                <div class="card-body">
                                    <img class="card-img-top" src="${imageURL}" alt="Card image cap" style="height: 270px; width: 100%; object-fit: cover;">
                                    <div class="mt-3">
                                        <h5 class="card-title">${carType}</h5>
                                        <h3><b>${carPriceRent} /hari</b></h3>
                                        <p class="card-text" style="margin-bottom: 20px;">${description}</p>
                                        <div class="penumpang d-flex">
                                            <img src="https://i.ibb.co/SrMTbBZ/icon-penumpang.png" alt="icon-penumpang" border="0" style="width: 25px; height: 25px;">
                                            <p class="ms-3">${capacity} orang</p>
                                        </div>
                                        <div class="settings d-flex">
                                            <img src="https://i.ibb.co/n3MNDF5/icon-settings.png" alt="icon-settings" border="0" style="width: 25px; height: 25px;">
                                            <p class="ms-3">${transmission}</p>
                                        </div>
                                        <div class="carYear d-flex">
                                            <img src="https://i.ibb.co/Sy9GJgm/fi-calendar.png" alt="fi-calendar" border="0" style="width: 25px; height: 25px;">
                                            <p class="ms-3">Tahun ${carYear}</p>
                                        </div>
                                        <a href="#" class="btn btn-green btn-block" style="margin-top: 20px; width: 100%; text-align:center;">Pilih Mobil</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `;

                    row.innerHTML += cardHTML;
                }

                this.filterResultSection.appendChild(row);
            }
        }
    }
}