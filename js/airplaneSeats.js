let passenger = sessionStorage.getItem('PASSENGERS');
console.log(passenger)
passenger=parseFloat(passenger.replace(/[^\d\.]*/g, ''));
console.log(typeof(passenger))
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
if (businessClassPrice==="true") {

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
}
if (premiumClassPrice==="true") {
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
}
let rect3 = document.getElementsByClassName("bg-copy");
if (economyClassPrice==="true") {
    // economy class

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
}
// return flight

if (businessClassPriceReturn==="true") {
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
}
if (premiumClassPriceReturn==="true") {
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
}
if (economyClassPriceReturn==="true") {
    // economy class
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
}









window.addEventListener("beforeunload", function (event) {
    event.returnValue = "Are you sure?";
});