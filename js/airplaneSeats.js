let passenger = sessionStorage.getItem('PASSENGERS');
passenger = parseFloat(passenger.replace(/[^\d\.]*/g, ''));
const departurePlace = sessionStorage.getItem('DEPARTUREPLACE');
const arrivalPlace = sessionStorage.getItem('ARRIVALPLACE');
const departureDate = sessionStorage.getItem('DEPARTUREDATE');
const arrivalDate = sessionStorage.getItem('ARRIVALDATE');
const priceTotal = sessionStorage.getItem('PRICETOTAL');
const priceTotal1 = sessionStorage.getItem('PRICETOTAL1');
const economyClassPrice = sessionStorage.getItem("ECONOMYCLASS")
const premiumClassPrice = sessionStorage.getItem("PREMIUMCLASS")
const businessClassPrice = sessionStorage.getItem("BUSINESSCLASS")
const economyClassPriceReturn = sessionStorage.getItem("ECONOMYCLASSRETURN")
const premiumClassPriceReturn = sessionStorage.getItem("PREMIUMCLASSRETURN")
const businessClassPriceReturn = sessionStorage.getItem("BUSINESSCLASSRETURN")
const seatNext = sessionStorage.getItem("SEATNEXT");

document.getElementById("cartDepartureDate").innerHTML = departureDate;
document.getElementById("cartDeparturePlace").innerHTML = departurePlace;
document.getElementById("cartArrivalPlace").innerHTML = arrivalPlace;
if (arrivalDate.length == 4) {
    document.getElementById("cartDepartureReturnDate").innerHTML = "";
} else {
    document.getElementById("cartDepartureReturnDate").innerHTML = arrivalDate;
}
if (arrivalDate.length == 4) {
    document.getElementById("cartDepartureReturnPlace").innerHTML = "";
} else {
    document.getElementById("cartDepartureReturnPlace").innerHTML = arrivalPlace;
}
if (arrivalDate.length == 4) {
    document.getElementById("cartArrivalReturnPlace").innerHTML = "";
} else {
    document.getElementById("cartArrivalReturnPlace").innerHTML = departurePlace;
}

if (arrivalDate.length == 4) {

    document.getElementById("cart-total-price").innerHTML = "PLN " + priceTotal1;
} else {
    document.getElementById("cart-total-price").innerHTML = "PLN " + priceTotal;
}
document.getElementById("numberOfPassengers").innerHTML = 'Liczba pasazerów: ' + passenger;

const seatDepartureChoice = document.getElementById('seatNumberDeparture');
const seatArrivalChoice = document.getElementById('seatNumberArrival');

let nextSeat = [];
let nextSeat1 = [];
let previousIdArray = [];
let nextIdArray = [];

// painting seat


let seat = JSON.parse(seats)
console.log(seat)

// first class
let rect1 = document.getElementsByClassName("Rectangle-1-Copy-2");
if (businessClassPrice === "true") {

    for (let i = 0; i < rect1.length; i++) {
        for (let j = 0; j < seat.length; j++) {

            let target = rect1[i];
            if (target.id === seat[j]) {
                target.classList.add('reserve');
            }
        }
        rect1[i].addEventListener("click", function (event) {
            console.log(i)
            let target = event.target;
            let length = (document.getElementsByClassName("highlight").length) + 1;
            console.log(length)
            if (target.classList[1] === "highlight") {
                length = length - 1;
                seatDepartureChoice.innerHTML = seatDepartureChoice.innerHTML.replace(target.id, '');
            }
            if (length <= passenger && target.classList[1] != "reserve") {
                if (target.classList[1] != "highlight") {
                    seatDepartureChoice.innerHTML += target.id + ' ';
                }
                target.classList.toggle("highlight")
            }
        })
    }
}
// premium class

let rect2 = document.getElementsByClassName("bg");

if (premiumClassPrice === "true") {

    for (let i = 0; i < rect2.length; i++) {
        for (let j = 0; j < seat.length; j++) {

            let target = rect2[i];
            if (target.id === seat[j]) {
                target.classList.add('reserve');
            }
        }
        rect2[i].addEventListener("click", function (event) {
            console.log(i)
            let target = event.target;
            let length = (document.getElementsByClassName("highlight").length) + 1;
            if (target.classList[1] === "highlight") {
                length = length - 1;
                seatDepartureChoice.innerHTML = seatDepartureChoice.innerHTML.replace(target.id, '');
            }

            if (length <= passenger && target.classList[1] != "reserve") {

                if (target.classList[1] != "highlight") {
                    seatDepartureChoice.innerHTML += target.id + ' ';
                }
                target.classList.toggle("highlight");
            }
        })
    }
}
let rect3 = document.getElementsByClassName("bg-copy");
if (economyClassPrice === "true") {
    // economy class
    for (let i = 0; i < rect3.length; i++) {
        for (let j = 0; j < seat.length; j++) {
            let target = rect3[i];
            if (target.id === seat[j]) {
                target.classList.add('reserve');
            }
        }
        rect3[i].addEventListener("click", function (event) {
            console.log(i)
            let target = event.target;
            let length = (document.getElementsByClassName("highlight").length) + 1;
            if (target.classList[1] === "highlight") {
                length = length - 1;
                seatDepartureChoice.innerHTML = seatDepartureChoice.innerHTML.replace(target.id, '');
            }
            if (length <= passenger && target.classList[1] != "reserve") {
                if (target.classList[1] != "highlight") {
                    seatDepartureChoice.innerHTML += target.id + ' ';

                }
                target.classList.toggle("highlight")

                if (seatNext === 'true' && target.classList[1] === "highlight") {
                    let seats = rect3[i].id;
                    // console.log(seats);
                    for (let y = 0; y < rect3.length; y++) {
                        let seats1 = rect3[y].id;
                        nextSeat1 = [...nextSeat1, seats1];
                    }
                    nextSeat1.sort();
                    // console.log(nextSeat1)
                    nextSeat = [...nextSeat, seats]
                    console.log(nextSeat)

                    // current id
                    for (let z = 0; z < nextSeat1.length; z++) {
                        if (seats === nextSeat1[z]) {
                            let currentId = nextSeat1[z];
                            // console.log(currentId)
                        }
                    }
                    // previous id
                    for (let z = 0; z < nextSeat1.length; z++) {
                        if (seats === nextSeat1[z]) {
                            let previousId = nextSeat1[z - 1];
                            previousIdArray = [...previousIdArray, previousId]
                            //     console.log(previousId)
                            //     console.log(previousIdArray)
                        }
                    }
                    // next id
                    for (let z = 0; z < nextSeat1.length; z++) {
                        if (seats === nextSeat1[z]) {
                            let nextId = nextSeat1[z + 1];
                            nextIdArray = [...nextIdArray, nextId]
                            // console.log(nextId)
                            // console.log(nextIdArray)
                        }
                    }
                }
                if (seatNext === 'true' && target.classList[1] != "highlight") {

                    let seats = rect3[i].id;
                    // console.log(seats)
                    for (let e of nextSeat) {
                        // console.log(e)
                        if (e === seats) {
                            splice(nextSeat, e)

                        }
                    }
                    console.log(nextSeat)

                    function splice(arr, val) {
                        for (var i = arr.length; i--;) {
                            if (arr[i] === val) {
                                arr.splice(i, 1);
                            }
                        }
                    }

                }

            }
        })
    }
}

// return flight
// first class
let rect4 = document.getElementsByClassName("Rectangle-1-Copy-2-return");

if (businessClassPriceReturn === "true" && arrivalDate.length != 4) {
    for (let i = 0; i < rect4.length; i++) {
        let seatsReturn = JSON.parse(seatReturn)
        for (let j = 0; j < seatsReturn.length; j++) {
            let target = rect4[i];
            if (target.id === seatsReturn[j]) {
                target.classList.add('reserve');
            }
        }

        rect4[i].addEventListener("click", function (event) {
            console.log(i)
            let target = event.target;
            let length = (document.getElementsByClassName("highlight1").length) + 1;
            if (target.classList[1] === "highlight1") {
                length = length - 1;
                seatArrivalChoice.innerHTML = seatArrivalChoice.innerHTML.replace(target.id, '');
            }
            if (length <= passenger && target.classList[1] != "reserve") {
                if (target.classList[1] != "highlight1") {
                    seatArrivalChoice.innerHTML += target.id + ' ';
                }
                target.classList.toggle("highlight1")
            }
        })
    }
}
// premium class
let rect5 = document.getElementsByClassName("bg-return");
if (premiumClassPriceReturn === "true" && arrivalDate.length != 4) {
    for (let i = 0; i < rect5.length; i++) {
        let seatsReturn = JSON.parse(seatReturn);
        for (let j = 0; j < seatsReturn.length; j++) {
            let target = rect5[i];
            if (target.id === seatsReturn[j]) {
                target.classList.add('reserve');
            }
        }

        rect5[i].addEventListener("click", function (event) {
            console.log(i)
            let target = event.target;
            let length = (document.getElementsByClassName("highlight1").length) + 1;
            if (target.classList[1] === "highlight1") {
                length = length - 1;
                seatArrivalChoice.innerHTML = seatArrivalChoice.innerHTML.replace(target.id, '');
            }
            if (length <= passenger && target.classList[1] != "reserve") {
                if (target.classList[1] != "highlight1") {
                    seatArrivalChoice.innerHTML += target.id + ' ';
                }
                target.classList.toggle("highlight1")

            }
        })
    }
}
// economy class
let rect6 = document.getElementsByClassName("bg-copy-return");

if (economyClassPriceReturn === "true" && arrivalDate.length != 4) {
    for (let i = 0; i < rect6.length; i++) {
        let seatsReturn = JSON.parse(seatReturn);
        for (let j = 0; j < seatsReturn.length; j++) {
            let target = rect6[i];
            if (target.id === seatsReturn[j]) {
                target.classList.add('reserve');
            }
        }

        rect6[i].addEventListener("click", function (event) {
            console.log(i)
            let target = event.target;
            let length = (document.getElementsByClassName("highlight1").length) + 1;
            if (target.classList[1] === "highlight1") {
                length = length - 1;
                seatArrivalChoice.innerHTML = seatArrivalChoice.innerHTML.replace(target.id, '');
            }
            if (length <= passenger && target.classList[1] != "reserve") {
                if (target.classList[1] != "highlight1") {
                    seatArrivalChoice.innerHTML += target.id + ' ';
                }
                target.classList.toggle("highlight1")

            }
        })
    }
}

// submit button validation

let invalid = "";

const submitButton = document.getElementById("continueButton");

continueButton.addEventListener('click', function () {

    if (validate() === !invalid) {


        if (businessClassPrice === "true") {
            iterate(rect1);
        }
        if (premiumClassPrice === "true") {
            iterate(rect2);
        }
        if (economyClassPrice === "true") {
            iterate(rect3);
        }
        if (businessClassPriceReturn === "true") {
            iterate(rect4);
        }
        if (premiumClassPriceReturn === "true") {
            iterate(rect5);
        }
        if (economyClassPriceReturn === "true") {
            iterate(rect6);
        }
        setInterval(function () {
            window.location.replace("/payment")
        }, 7000)

        function iterate(array) {
            for (let i of array) {
                let target = i;

                if (target.classList[1] != undefined && target.classList[1] != "reserve") {

                    console.log(target)

                    fetch('/home', {
                            method: 'PUT',
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                class: target.classList,
                                id: target.id
                            }),
                        })
                        .then(function (response) {
                            if (response.ok) {
                                console.log('Click was recorded');
                                return;
                            }
                            throw new Error('Request failed.');
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            }
        }
    }
})



function validate() {
    let length = (document.getElementsByClassName("highlight").length);
    let length1 = (document.getElementsByClassName("highlight1").length);

    let invalid = length != passenger;
    if (invalid) {
        return alert("Wybierz miejsca na lot docelowy");
    }

    let invalid1 = length1 != passenger;

    if (invalid1 && arrivalDate.length != 4) {
        return alert("Wybierz miejsca na lot powrotny");
    } else {
        return !invalid
    }
}

// exchange rates

const change = document.getElementById('currencies');
const insertCurrencyValue = document.getElementById('cart-total-price').innerHTML;
const Pln = parseFloat(insertCurrencyValue.replace(/[^\d\.]*/g, ''));

change.addEventListener("change", function loadCurrency() {

    let currency = this.value;
    if (currency === 'EUR' || currency === "USD") {

        fetch(`http://api.nbp.pl/api/exchangerates/rates/a/${currency}/`)
            .then((resp) => resp.json())
            .then(function (data) {
                const insertCurrency = document.getElementById('cart-total-price');
                const currencyValue = Pln / data.rates[0].mid;
                insertCurrency.innerHTML = `${currency} ${currencyValue.toFixed(0)}`;
            })
    } else {
        if (arrivalDate.length == 4) {

            document.getElementById("cart-total-price").innerHTML = "PLN " + priceTotal1;
        } else {
            document.getElementById("cart-total-price").innerHTML = "PLN " + priceTotal;
        }

    }
})
// weather api

window.addEventListener("load", function loadWather() {
    function changeCityNameToAirportName(city) {
        switch (city) {
            case 'Londyn':
                return 'London';
                break;
            case 'Nowy Jork':
                return 'Nowy Jork';
                break;
            case 'Dubaj':
                return 'Dubaj';
                break;
            default:
                console.log('Not correct value')

        }
    }

    transformedCityName = changeCityNameToAirportName(arrivalPlace)

    const weatherAfterLoad = transformedCityName;
    showOption = document.getElementById("option-selected");

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${weatherAfterLoad}&cnt=5&appid=ecd6ba7cde8d46460f0cdb7d0b261058`)
        .then((resp) => resp.json())
        .then(function (data) {
            console.log(data)
            let weatherIcon = data.weather[0].icon

            showOption.innerHTML = `temperatura aktualna ${weatherAfterLoad} ${data.weather[0].main} ${(data.main.temp-273.15).toFixed(1)} &#x2103 temperatura odczuwalna ${(data.main.feels_like-273.15).toFixed(1)} &#x2103`;

            let icons = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`

            document.getElementById("weatherIcon").setAttribute("src", icons)

        })
})

// prevent back

function disableBack() {
    window.history.forward();
}
setTimeout("disableBack()", 0);
window.onunload = function () {
    null
};