const passenger = sessionStorage.getItem('PASSENGERS');
const departurePlace = sessionStorage.getItem('DEPARTUREPLACE');
const arrivalPlace = sessionStorage.getItem('ARRIVALPLACE');
const departureDate = sessionStorage.getItem('DEPARTUREDATE');
const arrivalDate = sessionStorage.getItem('ARRIVALDATE');
const priceTotal = sessionStorage.getItem('PRICETOTAL');
const priceTotal1 = sessionStorage.getItem('PRICETOTAL1');

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
document.getElementById("numberOfPassengers").innerHTML = passenger;

// painting seat
// first class
let rect1 = document.getElementsByClassName("Rectangle-1-Copy-2");

for (let i = 0; i < rect1.length; i++) {

    rect1[i].addEventListener("click", function (event) {
        console.log(i)
        let target = event.target;
        console.log(target)
        if (target.style.fill != "red") {
            // Style the trigger based on adding/removing the pre-existing class
            target.classList.toggle("highlight")

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
    })
}

// premium class
let rect2 = document.getElementsByClassName("bg");


for (let i = 0; i < rect2.length; i++) {

    rect2[i].addEventListener("click", function (event) {
        console.log(i)
        let target = event.target;
        console.log(target)
        if (target.style.fill != "red") {
            // Style the trigger based on adding/removing the pre-existing class
            target.classList.toggle("highlight")

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
    })
}
// premium class
let rect3 = document.getElementsByClassName("bg-copy");


for (let i = 0; i < rect3.length; i++) {

    rect3[i].addEventListener("click", function (event) {
        console.log(i)
        let target = event.target;
        console.log(target)
        if (target.style.fill != "red") {
            // Style the trigger based on adding/removing the pre-existing class
            target.classList.toggle("highlight")

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
    })
}

// return flight

// first class
rect1 = document.getElementsByClassName("Rectangle-1-Copy-2-return");

for (let i = 0; i < rect1.length; i++) {

    rect1[i].addEventListener("click", function (event) {
        console.log(i)
        let target = event.target;
        console.log(target)
        if (target.style.fill != "red") {
            // Style the trigger based on adding/removing the pre-existing class
            target.classList.toggle("highlight")

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
    })
}

// premium class
rect2 = document.getElementsByClassName("bg-return");


for (let i = 0; i < rect2.length; i++) {

    rect2[i].addEventListener("click", function (event) {
        console.log(i)
        let target = event.target;
        console.log(target)
        if (target.style.fill != "red") {
            // Style the trigger based on adding/removing the pre-existing class
            target.classList.toggle("highlight")

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
    })
}
// premium class
rect3 = document.getElementsByClassName("bg-copy-return");


for (let i = 0; i < rect3.length; i++) {

    rect3[i].addEventListener("click", function (event) {
        console.log(i)
        let target = event.target;
        console.log(target)
        
        if (target.style.fill != "red") {
            // Style the trigger based on adding/removing the pre-existing class
            target.classList.toggle("highlight")
            

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
    })
}










window.addEventListener("beforeunload", function (event) {
    event.returnValue = "Are you sure?";
});