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

    document.getElementById("cart-total-price").innerHTML = "Do zapłaty: " + priceTotal1+" PLN";
} else {
    document.getElementById("cart-total-price").innerHTML = "Do zapłaty: " + priceTotal+" PLN";
}
document.getElementById("numberOfPassengers").innerHTML = 'Liczba pasazerów: ' + passenger;

const seatDepartureChoice = document.getElementById('seatNumberDeparture');
const seatArrivalChoice = document.getElementById('seatNumberArrival');

let nextSeat = [];
let nextSeat1 = [];
let nextSeatReturn = [];
let nextId;
let previousId;

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
        if (seatNext === 'false') {
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
        if (seatNext === 'true') {
            rect1[i].addEventListener("click", function (event) {
                console.log(i)
                let target = event.target;
                let length = (document.getElementsByClassName("highlight").length) + 1;

                if (target.classList[1] === "highlight") {

                    let seats = rect1[i].id;

                    if (seats === nextSeat[0] || seats === nextSeat[nextSeat.length - 1]) {
                        splice(nextSeat, seats)
                        // console.log("Jestem tutaj4")
                        seatDepartureChoice.innerHTML = seatDepartureChoice.innerHTML.replace(target.id, '');
                        console.log(nextSeat)
                        length = length - 1;
                    }

                    function splice(arr, val) {
                        for (var i = arr.length; i--;) {
                            if (arr[i] === val) {
                                arr.splice(i, 1);
                            }
                        }
                    }
                }

                if (length <= passenger && target.classList[1] != "reserve") {
                    if (target.classList[1] != "highlight") {

                        if (nextSeat.length > 0) {
                            let seats = rect1[i].id;
                            for (let y = 0; y < rect1.length; y++) {
                                let seats1 = rect1[y].id;
                                nextSeat1 = [...nextSeat1, seats1];

                            }
                            target.classList.toggle("highlight")
                            // console.log("Toogle1")
                            nextSeat1.sort();
                            // console.log(nextSeat1)
                            // previous id
                            for (let z = 0; z < nextSeat1.length; z++) {
                                if (nextSeat[0] === nextSeat1[z]) {
                                    previousId = nextSeat1[z + (-1)];
                                    break;
                                }
                            }
                            // console.log(previousId)
                            // next id
                            for (let z = 0; z < nextSeat1.length; z++) {
                                if (nextSeat[nextSeat.length - 1] === nextSeat1[z]) {
                                    nextId = nextSeat1[z + 1];
                                }
                            }
                            // console.log(nextId)
                            if (seats === previousId || seats === nextId) {
                                nextSeat = [...nextSeat, seats]
                                target.classList.toggle("highlight");
                                // console.log("toggle2")
                                seatDepartureChoice.innerHTML += target.id + ' ';
                            }
                            nextSeat.sort();
                        }
                        if (nextSeat.length == 0) {
                            let seats = rect1[i].id;
                            nextSeat = [...nextSeat, seats]
                            seatDepartureChoice.innerHTML += target.id + ' ';
                        }
                        // console.log(nextSeat)
                    }
                    target.classList.toggle("highlight")
                    // console.log("toggle3")
                    let length1 = (document.getElementsByClassName("highlight").length) + 1;
                    if (length > length1) {
                        target.classList.toggle("highlight")
                        // console.log("toggle4")
                    }
                }
            })
        }

    }
}
// premium class

let rect2 = document.getElementsByClassName("bg");

if (premiumClassPrice === "true") {
    // economy class
    for (let i = 0; i < rect2.length; i++) {
        for (let j = 0; j < seat.length; j++) {
            let target = rect2[i];
            if (target.id === seat[j]) {
                target.classList.add('reserve');
            }
        }
        if (seatNext === 'false') {
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
                    target.classList.toggle("highlight")

                }
            })
        }
        if (seatNext === 'true') {
            rect2[i].addEventListener("click", function (event) {
                console.log(i)
                let target = event.target;
                let length = (document.getElementsByClassName("highlight").length) + 1;

                if (target.classList[1] === "highlight") {

                    let seats = rect2[i].id;

                    if (seats === nextSeat[0] || seats === nextSeat[nextSeat.length - 1]) {
                        splice(nextSeat, seats)
                        console.log("Jestem tutaj4")
                        seatDepartureChoice.innerHTML = seatDepartureChoice.innerHTML.replace(target.id, '');
                        console.log(nextSeat)
                        length = length - 1;
                    }

                    function splice(arr, val) {
                        for (var i = arr.length; i--;) {
                            if (arr[i] === val) {
                                arr.splice(i, 1);
                            }
                        }
                    }
                }

                if (length <= passenger && target.classList[1] != "reserve") {
                    if (target.classList[1] != "highlight") {

                        if (nextSeat.length > 0) {
                            let seats = rect2[i].id;
                            for (let y = 0; y < rect2.length; y++) {
                                let seats1 = rect2[y].id;
                                nextSeat1 = [...nextSeat1, seats1];

                            }
                            target.classList.toggle("highlight")
                            // console.log("Toogle1")
                            nextSeat1.sort();
                            // console.log(nextSeat1)
                            // previous id
                            for (let z = 0; z < nextSeat1.length; z++) {
                                if (nextSeat[0] === nextSeat1[z]) {
                                    previousId = nextSeat1[z + (-1)];
                                    break;
                                }
                            }
                            // console.log(previousId)
                            // next id
                            for (let z = 0; z < nextSeat1.length; z++) {
                                if (nextSeat[nextSeat.length - 1] === nextSeat1[z]) {
                                    nextId = nextSeat1[z + 1];
                                }
                            }
                            // console.log(nextId)
                            if (seats === previousId || seats === nextId) {
                                nextSeat = [...nextSeat, seats]
                                target.classList.toggle("highlight");
                                // console.log("toggle2")
                                seatDepartureChoice.innerHTML += target.id + ' ';
                            }
                            nextSeat.sort();
                        }
                        if (nextSeat.length == 0) {
                            let seats = rect2[i].id;
                            nextSeat = [...nextSeat, seats]
                            seatDepartureChoice.innerHTML += target.id + ' ';
                        }
                        // console.log(nextSeat)
                    }
                    target.classList.toggle("highlight")
                    // console.log("toggle3")
                    let length1 = (document.getElementsByClassName("highlight").length) + 1;
                    if (length > length1) {
                        target.classList.toggle("highlight")
                        // console.log("toggle4")
                    }
                }
            })
        }
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
        if (seatNext === 'false') {
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

                }
            })
        }
        if (seatNext === 'true') {
            rect3[i].addEventListener("click", function (event) {
                console.log(i)
                let target = event.target;
                let length = (document.getElementsByClassName("highlight").length) + 1;

                if (target.classList[1] === "highlight") {

                    let seats = rect3[i].id;

                    if (seats === nextSeat[0] || seats === nextSeat[nextSeat.length - 1]) {
                        splice(nextSeat, seats)
                        console.log("Jestem tutaj4")
                        seatDepartureChoice.innerHTML = seatDepartureChoice.innerHTML.replace(target.id, '');
                        console.log(nextSeat)
                        length = length - 1;
                    }

                    function splice(arr, val) {
                        for (var i = arr.length; i--;) {
                            if (arr[i] === val) {
                                arr.splice(i, 1);
                            }
                        }
                    }
                }

                if (length <= passenger && target.classList[1] != "reserve") {
                    if (target.classList[1] != "highlight") {

                        if (nextSeat.length > 0) {
                            let seats = rect3[i].id;
                            for (let y = 0; y < rect3.length; y++) {
                                let seats1 = rect3[y].id;
                                nextSeat1 = [...nextSeat1, seats1];

                            }
                            target.classList.toggle("highlight")
                            // console.log("Toogle1")
                            nextSeat1.sort();
                            // console.log(nextSeat1)
                            // previous id
                            for (let z = 0; z < nextSeat1.length; z++) {
                                if (nextSeat[0] === nextSeat1[z]) {
                                    previousId = nextSeat1[z + (-1)];
                                    break;
                                }
                            }
                            // console.log(previousId)
                            // next id
                            for (let z = 0; z < nextSeat1.length; z++) {
                                if (nextSeat[nextSeat.length - 1] === nextSeat1[z]) {
                                    nextId = nextSeat1[z + 1];
                                }
                            }
                            // console.log(nextId)
                            if (seats === previousId || seats === nextId) {
                                nextSeat = [...nextSeat, seats]
                                target.classList.toggle("highlight");
                                // console.log("toggle2")
                                seatDepartureChoice.innerHTML += target.id + ' ';
                            }
                            nextSeat.sort();
                        }
                        if (nextSeat.length == 0) {
                            let seats = rect3[i].id;
                            nextSeat = [...nextSeat, seats]
                            seatDepartureChoice.innerHTML += target.id + ' ';
                        }
                        // console.log(nextSeat)
                    }
                    target.classList.toggle("highlight")
                    // console.log("toggle3")
                    let length1 = (document.getElementsByClassName("highlight").length) + 1;
                    if (length > length1) {
                        target.classList.toggle("highlight")
                        // console.log("toggle4")
                    }
                }
            })
        }
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
        if (seatNext === 'false') {
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
        if (seatNext === 'true') {
            rect4[i].addEventListener("click", function (event) {
                console.log(i)
                let target = event.target;
                let length = (document.getElementsByClassName("highlight1").length) + 1;
                // console.log(nextSeatReturn)
                if (target.classList[1] === "highlight1") {

                    let seats = rect4[i].id;
                    // console.log("Jestem w 6")
                    if (seats === nextSeatReturn[0] || seats === nextSeatReturn[nextSeatReturn.length - 1]) {
                        splice(nextSeatReturn, seats)
                        seatArrivalChoice.innerHTML = seatArrivalChoice.innerHTML.replace(target.id, '');
                        length = length - 1;
                    }
                    // console.log(nextSeat)

                    function splice(arr, val) {
                        for (var i = arr.length; i--;) {
                            if (arr[i] === val) {
                                arr.splice(i, 1);
                            }
                        }
                    }
                }

                if (length <= passenger && target.classList[1] != "reserve") {
                    // console.log(length)
                    if (target.classList[1] != "highlight1") {

                        if (nextSeatReturn.length > 0) {
                            let seats = rect4[i].id;
                            for (let y = 0; y < rect4.length; y++) {
                                let seats1 = rect4[y].id;
                                nextSeat1 = [...nextSeat1, seats1];
                            }
                            target.classList.toggle("highlight1")
                            nextSeat1.sort();

                            // previous id
                            for (let z = 0; z < nextSeat1.length; z++) {
                                if (nextSeatReturn[0] === nextSeat1[z]) {
                                    previousId = nextSeat1[z + (-1)];
                                    break;
                                }
                            }

                            // next id
                            for (let z = 0; z < nextSeat1.length; z++) {
                                if (nextSeatReturn[nextSeatReturn.length - 1] === nextSeat1[z]) {
                                    nextId = nextSeat1[z + 1];
                                }
                            }
                            if (seats === previousId || seats === nextId) {
                                nextSeatReturn = [...nextSeatReturn, seats]
                                target.classList.toggle("highlight1");
                                seatArrivalChoice.innerHTML += target.id + ' ';
                            }
                            nextSeatReturn.sort();
                        }
                        if (nextSeatReturn.length == 0) {
                            let seats = rect4[i].id;
                            nextSeatReturn = [...nextSeatReturn, seats]
                            seatArrivalChoice.innerHTML += target.id + ' ';
                        }
                    }
                    target.classList.toggle("highlight1")
                    let length1 = (document.getElementsByClassName("highlight1").length) + 1;
                    if (length > length1) {
                        target.classList.toggle("highlight1")
                    }
                }
            })
        }

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
        if (seatNext === 'false') {
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
        if (seatNext === 'true') {
            rect5[i].addEventListener("click", function (event) {
                console.log(i)
                let target = event.target;
                let length = (document.getElementsByClassName("highlight1").length) + 1;
                // console.log(nextSeatReturn)
                if (target.classList[1] === "highlight1") {

                    let seats = rect5[i].id;
                    // console.log("Jestem w 6")
                    if (seats === nextSeatReturn[0] || seats === nextSeatReturn[nextSeatReturn.length - 1]) {
                        splice(nextSeatReturn, seats)
                        seatArrivalChoice.innerHTML = seatArrivalChoice.innerHTML.replace(target.id, '');
                        length = length - 1;
                    }
                    // console.log(nextSeat)

                    function splice(arr, val) {
                        for (var i = arr.length; i--;) {
                            if (arr[i] === val) {
                                arr.splice(i, 1);
                            }
                        }
                    }
                }

                if (length <= passenger && target.classList[1] != "reserve") {
                    // console.log(length)
                    if (target.classList[1] != "highlight1") {

                        if (nextSeatReturn.length > 0) {
                            let seats = rect5[i].id;
                            for (let y = 0; y < rect5.length; y++) {
                                let seats1 = rect5[y].id;
                                nextSeat1 = [...nextSeat1, seats1];
                            }
                            target.classList.toggle("highlight1")
                            nextSeat1.sort();

                            // previous id
                            for (let z = 0; z < nextSeat1.length; z++) {
                                if (nextSeatReturn[0] === nextSeat1[z]) {
                                    previousId = nextSeat1[z + (-1)];
                                    break;
                                }
                            }

                            // next id
                            for (let z = 0; z < nextSeat1.length; z++) {
                                if (nextSeatReturn[nextSeatReturn.length - 1] === nextSeat1[z]) {
                                    nextId = nextSeat1[z + 1];
                                }
                            }
                            if (seats === previousId || seats === nextId) {
                                nextSeatReturn = [...nextSeatReturn, seats]
                                target.classList.toggle("highlight1");
                                seatArrivalChoice.innerHTML += target.id + ' ';
                            }
                            nextSeatReturn.sort();
                        }
                        if (nextSeatReturn.length == 0) {
                            let seats = rect5[i].id;
                            nextSeatReturn = [...nextSeatReturn, seats]
                            seatArrivalChoice.innerHTML += target.id + ' ';
                        }
                    }
                    target.classList.toggle("highlight1")
                    let length1 = (document.getElementsByClassName("highlight1").length) + 1;
                    if (length > length1) {
                        target.classList.toggle("highlight1")
                    }
                }
            })
        }
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
        if (seatNext === 'false') {
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
        if (seatNext === 'true') {
            rect6[i].addEventListener("click", function (event) {
                console.log(i)
                let target = event.target;
                let length = (document.getElementsByClassName("highlight1").length) + 1;
                // console.log(nextSeatReturn)
                if (target.classList[1] === "highlight1") {

                    let seats = rect6[i].id;
                    // console.log("Jestem w 6")
                    if (seats === nextSeatReturn[0] || seats === nextSeatReturn[nextSeatReturn.length - 1]) {
                        splice(nextSeatReturn, seats)
                        seatArrivalChoice.innerHTML = seatArrivalChoice.innerHTML.replace(target.id, '');
                        length = length - 1;
                    }
                    // console.log(nextSeat)

                    function splice(arr, val) {
                        for (var i = arr.length; i--;) {
                            if (arr[i] === val) {
                                arr.splice(i, 1);
                            }
                        }
                    }
                }

                if (length <= passenger && target.classList[1] != "reserve") {
                    // console.log(length)
                    if (target.classList[1] != "highlight1") {

                        if (nextSeatReturn.length > 0) {
                            let seats = rect6[i].id;
                            for (let y = 0; y < rect6.length; y++) {
                                let seats1 = rect6[y].id;
                                nextSeat1 = [...nextSeat1, seats1];
                            }
                            target.classList.toggle("highlight1")
                            nextSeat1.sort();

                            // previous id
                            for (let z = 0; z < nextSeat1.length; z++) {
                                if (nextSeatReturn[0] === nextSeat1[z]) {
                                    previousId = nextSeat1[z + (-1)];
                                    break;
                                }
                            }

                            // next id
                            for (let z = 0; z < nextSeat1.length; z++) {
                                if (nextSeatReturn[nextSeatReturn.length - 1] === nextSeat1[z]) {
                                    nextId = nextSeat1[z + 1];
                                }
                            }
                            if (seats === previousId || seats === nextId) {
                                nextSeatReturn = [...nextSeatReturn, seats]
                                target.classList.toggle("highlight1");
                                seatArrivalChoice.innerHTML += target.id + ' ';
                            }
                            nextSeatReturn.sort();
                        }
                        if (nextSeatReturn.length == 0) {
                            let seats = rect6[i].id;
                            nextSeatReturn = [...nextSeatReturn, seats]
                            seatArrivalChoice.innerHTML += target.id + ' ';
                        }
                    }
                    target.classList.toggle("highlight1")
                    let length1 = (document.getElementsByClassName("highlight1").length) + 1;
                    if (length > length1) {
                        target.classList.toggle("highlight1")
                    }
                }
            })
        }
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

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${weatherAfterLoad}&cnt=5&appid=ecd6ba7cde8d46460f0cdb7d0b261058`)
        .then((resp) => resp.json())
        .then(function (data) {
            console.log(data)
            let image = document.createElement("img");
            image.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            document.getElementById("icon").appendChild(image);

            document.getElementById('city').innerHTML = weatherAfterLoad;

            document.getElementById(
                `weather`
            ).innerHTML = `${data.weather[0].description}`;

            document.getElementById(
                `temp`
            ).innerHTML = `${(
            data.main.temp - 273.15
          ).toFixed(1)} &#x2103`;

        });

})


// prevent back

function disableBack() {
    window.history.forward();
}
setTimeout("disableBack()", 0);
window.onunload = function () {
    null
};