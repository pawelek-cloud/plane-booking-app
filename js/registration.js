let price = 0;
let price1 = 0;
let price2 = 0;
let index = 0;

window.addEventListener("load", () => {

    // flight details



    const params = (new URL(document.location)).searchParams

    let departurePlace = params.get("departurePlace");
    let arrivalPlace = params.get("arrivalPlace");
    const departureDate = params.get("departureDate");
    const arrivalDate = params.get("arrivalDate")

    document.getElementById("departurePlace").innerHTML = departurePlace;
    document.getElementById("arrivalPlace").innerHTML = arrivalPlace;
    document.getElementById("departureDate").innerHTML = departureDate;

    if (arrivalDate === null) {
        document.getElementById("arrivalDate1").innerHTML = "";

    } else {
        document.getElementById("arrivalDate").innerHTML = arrivalDate;
    }

    // submit button 

    function sendData() {

        const city = arrivalPlace;

        function changeCityNameToAirportName(city) {
            switch (city) {
                case 'London':
                    return 'LHR';
                    break;
                case 'Rio de Janeiro':
                    return 'GIG';
                    break;
                case 'Dubai':
                    return 'DXB';
                    break;
                case 'Warszawa':
                    return 'WAW';
                    break;
                default:
                    console.log('Not correct value')

            }
        }
        let transformedCityName = changeCityNameToAirportName(city);

        let transformCity = changeCityNameToAirportName(departurePlace)


        fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/PL/PLN/en-PL/${transformCity}-sky/${transformedCityName}-sky/${departureDate}?inboundpartialdate=${arrivalDate}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": "66b4be106amsh70082ce762891bcp1e18a4jsnf50eb105953a",
                    "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
                }
            })
            .then((resp) => resp.json())
            .then(function (data) {

                function bolleanIntoPolish(i) {
                    if (data.Quotes[i].Direct === false) {
                        return "nie"
                    } else {
                        return "tak"
                    }
                }

                function noDate() {
                    if (data.Carriers[0] === undefined) {
                        document.getElementById("routes").innerHTML = "Brak lotów w wybranym terminie. Wybierz inny termin";
                        document.getElementById("directFlights").innerHTML = "";
                        document.getElementById("returnFlights").innerHTML = "";
                    } else {

                        for (let i = 0; i < data.Carriers.length; i++) {
                            document.getElementById("routes").innerHTML += "Cena minimalna biletu z: " + data.Places[1].Name + " do: " + data.Places[0].Name + " to: " + data.Quotes[i].MinPrice + "" + " " + data.Currencies[0].Code + "; przewoźnik: " + data.Carriers[i].Name + "; data wylotu: " + data.Dates.OutboundDates[0].PartialDate + "; lot bezposredni: " + bolleanIntoPolish(i) + "<br/>" + "<button name='btn'>Wybierz klasę podróży</button>" + "<br/><br/>";
                        }
                        if (arrivalDate === null) {
                            document.getElementById("returnFlights").innerHTML = "";
                        }

                        console.log(data);

                        // display classes

                        const showClasses = document.getElementsByTagName("button");

                        for (let i = 0; i < showClasses.length; i++) {
                            showClasses[i].addEventListener('click', function showOrHideClasses() {
                                price = data.Quotes[i].MinPrice;
                                price1 = data.Quotes[0].MinPrice;
                                console.log(showClasses.length)
                                switch (true) {
                                    case showClasses.length>3:
                                        price2 = data.Quotes[1].MinPrice;
                                        break;
                                    default:
                                        console.log('Length not=4')
                                }
                                index = i;
                                createClasses();
                            });
                        }

                        if (arrivalDate != null && data.Carriers[0] != undefined) {
                            returnData();
                        }
                    }
                }
                noDate();
            })

    }
    sendData();

    // return



    function returnData() {

        let city = arrivalPlace;

        function changeCityNameToAirportName(city) {
            switch (city) {
                case 'London':
                    return 'LHR';
                    break;
                case 'Rio de Janeiro':
                    return 'GIG';
                    break;
                case 'Dubai':
                    return 'DXB';
                    break;
                case 'Warszawa':
                    return 'WAW';
                    break;
                default:
                    console.log('Not correct value')

            }
        }
        transformCity = changeCityNameToAirportName(city);

        transformedCityName = changeCityNameToAirportName(departurePlace)

        tmp = transformCity;
        transformCity = transformedCityName;
        transformedCityName = tmp;

        fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/PL/PLN/en-PL/${transformedCityName}-sky/${transformCity}-sky/${arrivalDate}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": "66b4be106amsh70082ce762891bcp1e18a4jsnf50eb105953a",
                    "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
                }
            })
            .then((resp) => resp.json())
            .then(function (data) {

                function bolleanIntoPolish(i) {
                    if (data.Quotes[i].Direct === false) {
                        return "nie"
                    } else {
                        return "tak"
                    }
                }

                console.log(data);

                if (data.Carriers[0] === undefined) {

                    document.getElementById("return").innerHTML = " Brak lotów powrotnych w wybranym terminie. Wybierz inny termin."
                } else {

                    for (let i = 0; i < data.Carriers.length; i++) {
                        document.getElementById("return").innerHTML += "Cena minimalna biletu z: " + data.Places[0].Name + " do: " + data.Places[1].Name + " to: " + data.Quotes[i].MinPrice + "" + " " + data.Currencies[0].Code + "; przewoźnik: " + data.Carriers[i].Name + "; data wylotu: " + data.Dates.OutboundDates[0].PartialDate + "; lot bezposredni: " + bolleanIntoPolish(i) + "<br/>" +
                            "<button class='button' name='btn'>Wybierz klasę podróży</button>" + "<br/><br/>";

                        const showClasses = document.getElementsByTagName("button");

                        for (let i = 0; i < showClasses.length; i++) {
                            showClasses[i].addEventListener('click', function showOrHideClasses() {

                                console.log(i)
                                switch (i) {
                                    case i = 0:
                                        price = price1;
                                        console.log(1)
                                        break;
                                        
                                    case showClasses.length > 3 && (i = 1):
                                        price = price2;
                                        console.log(2)
                                        break;
                                    case showClasses.length = 3 && (i = 1):
                                        price = data.Quotes[0].MinPrice;
                                        console.log(3)
                                        break;
                                    case showClasses.length > 3 && (i = 2):
                                        price = data.Quotes[0].MinPrice;
                                        console.log(4)
                                        break;
                                    case showClasses.length = 3 && (i = 2):
                                        price = data.Quotes[1].MinPrice;
                                        console.log(5)
                                        break;
                                    case showClasses.length = 4 && (i = 3):
                                        price = data.Quotes[1].MinPrice;
                                        console.log(6)
                                        break;
                                    case showClasses.length = 3 && (i = 3):
                                        price = data.Quotes[1].MinPrice;
                                        console.log(7)
                                        break;
                                    default:
                                        console.log('Something went wrong')

                                }


                                index = i;
                                createClasses();
                            });
                        }


                    }

                }


            })
    }

})

// after reload

window.addEventListener("beforeunload", function (event) {
    event.returnValue = "Are you sure?";
});

// return button

document.getElementById("returnButton").addEventListener("click", function goBack() {

    history.back(-1);
})

// create dynamic button in html

function createClasses() {

    // ECONOMY

    let divContainer = document.createElement("div");
    divContainer.className = "container";
    divContainer.id = "divContainer";

    let divRow = document.createElement("div");
    divRow.className = "row";
    divContainer.appendChild(divRow);

    let divCol = document.createElement("div");
    divCol.className = "col";
    divRow.appendChild(divCol);

    let divCard = document.createElement("div");
    divCard.className = "card";
    divCard.style.width = "20rem";
    divCol.appendChild(divCard);

    let image = document.createElement("img");
    image.className = "card-img-top";
    image.setAttribute('src', 'https://book.lot.com/image/journal/article?img_id=142788&t=1600695071504');
    divCard.appendChild(image);

    let divCardBlock = document.createElement("div");
    divCardBlock.className = "card-block";
    divCard.appendChild(divCardBlock);

    let cardTitle = document.createElement("h4");
    cardTitle.className = "card-title";
    cardTitle.innerHTML = 'ECONOMY';
    divCardBlock.appendChild(cardTitle);

    let pPrice = document.createElement("p");
    pPrice.className = "card-text";
    pPrice.innerHTML = 'Cena: PLN ' + price;
    divCardBlock.appendChild(pPrice);

    let a = document.createElement('a');
    a.href = '#';
    a.setAttribute("data-name", "Economy");
    a.setAttribute("data-price", "price");
    a.className = "add-to-cart btn btn-primary";
    a.innerHTML = "Wybiesz klasę lotu";
    divCardBlock.appendChild(a);

    // PREMIUM

    divCol = document.createElement("div");
    divCol.className = "col";
    divRow.appendChild(divCol);

    divCard = document.createElement("div");
    divCard.className = "card";
    divCard.style.width = "20rem";
    divCol.appendChild(divCard);

    image = document.createElement("img");
    image.className = "card-img-top";
    image.setAttribute('src', 'https://book.lot.com/image/journal/article?img_id=142802&t=1600695077795');
    divCard.appendChild(image);

    divCardBlock = document.createElement("div");
    divCardBlock.className = "card-block";
    divCard.appendChild(divCardBlock);

    cardTitle = document.createElement("h4");
    cardTitle.className = "card-title";
    cardTitle.innerHTML = 'PREMIUM';
    divCardBlock.appendChild(cardTitle);

    let pricePremium = price + 1000;

    pPrice = document.createElement("p");
    pPrice.className = "card-text";
    pPrice.innerHTML = 'Cena: PLN ' + pricePremium;
    divCardBlock.appendChild(pPrice);

    a = document.createElement('a');
    a.href = '#';
    a.setAttribute("data-name", "Premium");
    a.setAttribute("data-price", "pricePremium");
    a.className = "add-to-cart btn btn-primary";
    a.innerHTML = "Wybiesz klasę lotu";
    divCardBlock.appendChild(a);

    // BUSINESS

    let priceBusiness = pricePremium + 200;

    divCol = document.createElement("div");
    divCol.className = "col";
    divRow.appendChild(divCol);

    divCard = document.createElement("div");
    divCard.className = "card";
    divCard.style.width = "20rem";
    divCol.appendChild(divCard);

    image = document.createElement("img");
    image.className = "card-img-top";
    image.setAttribute('src', 'https://book.lot.com/image/journal/article?img_id=142820&t=1600695081474');
    divCard.appendChild(image);

    divCardBlock = document.createElement("div");
    divCardBlock.className = "card-block";
    divCard.appendChild(divCardBlock);

    cardTitle = document.createElement("h4");
    cardTitle.className = "card-title";
    cardTitle.innerHTML = 'BUSINESS';
    divCardBlock.appendChild(cardTitle);

    pPrice = document.createElement("p");
    pPrice.className = "card-text";
    pPrice.innerHTML = 'Cena: PLN ' + priceBusiness;
    divCardBlock.appendChild(pPrice);

    a = document.createElement('a');
    a.href = '#';
    a.setAttribute("data-name", "Business");
    a.setAttribute("data-price", "priceBusiness");
    a.className = "add-to-cart btn btn-primary";
    a.innerHTML = "Wybiesz klasę lotu";
    divCardBlock.appendChild(a);


    // insert after

    function insertAfter(referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }

    // add class under certain button

    // button

    function myFunction(index) {

        let button = document.getElementsByTagName("button")[index];
        let div = document.getElementById("divContainer");

        insertAfter(button, divContainer);

        if (document.contains(div)) {
            div.remove();

        } else {
            insertAfter(button, divContainer);
        }
    }
    myFunction(index)


    // return button

    // function myFunction1(index1) {

    //     let div = document.getElementById("divContainer");

    //     let button = document.getElementsByClassName("button")[index1];

    //     insertAfter(button, divContainer);

    //     if (document.contains(div)) {

    //         div.remove();

    //     } else {
    //         insertAfter(button, divContainer);
    //     }

    // let returnButton = document.getElementsByClassName("returnButton")[index];
    // console.log(index)

    // insertAfter(returnButton, divContainer);

    // if (document.contains(div)) {

    //     div.remove();

    // } else {
    //     insertAfter(returnButton, divContainer);
    // }
}
// myFunction1(index1);
// }