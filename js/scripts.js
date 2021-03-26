const gallery = document.querySelector('#gallery')

//use fetch API to access data
fetch('https://randomuser.me/api/?results=12')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        for (let i = 0; i < 12; i++) {
            firstFunction(data.results[i])
        }
        for (let i = 0; i < 12; i++) {
            const cards = document.querySelectorAll('.card')
            cards[i].addEventListener('click', () => secondFunction(data.results[i]))
        }
    })

//the first function to create a user
function firstFunction(result) {
    const html = `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src=${result.picture.large} alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${result.name.first} ${result.name.last}</h3>
                <p class="card-text">${result.email}</p>
                <p class="card-text cap">${result.location.city}, ${result.location.state}</p>
            </div>
        </div>
    `
    gallery.insertAdjacentHTML('beforeend', html)
}

//the second function to display overlay
function secondFunction(result) {
    const birthday = () => {
        const num = result.dob.date.slice(0, 10).split('-')
        return `${num[1]}/${num[2]}/${num[0]}`
    }
    const html = `
        <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src=${result.picture.large} alt="profile picture">
                    <h3 id="name" class="modal-name cap">${result.name.first} ${result.name.last}</h3>
                    <p class="modal-text">${result.email}</p>
                    <p class="modal-text cap">${result.location.city}</p>
                    <hr>
                    <p class="modal-text">${result.cell}</p>
                    <p class="modal-text">${result.location.street.number} ${result.location.street.name}, ${result.location.city}, ${result.location.state}, ${result.location.postcode}</p>
                    <p class="modal-text">Birthday: ${birthday()}</p>
                </div>
            </div>
    `
    document.body.insertAdjacentHTML('beforeend', html)

    const X = document.querySelector('#modal-close-btn')
    const modalContainer = document.querySelector('.modal-container')
    X.addEventListener('click', e => {
        document.body.removeChild(modalContainer)
    })
}
