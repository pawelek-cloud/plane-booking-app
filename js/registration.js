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
                            "<button id='button' name='btn'>Wybierz klasę podróży</button>" + "<br/><br/>";



                    }
                }
                // display classes

                const showClasses = document.getElementsByTagName("button");

                for (let i = 0; i < showClasses.length; i++) {
                    showClasses[i].addEventListener('click', function showOrHideClasses() {
                        createClasses();
                    });
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

    const divContainer = document.createElement("div");
    divContainer.className = "container";
    divContainer.setAttribute = ("id", "divContainer");

    const divRow = document.createElement("div");
    divRow.className = "row";
    divContainer.appendChild(divRow);

    const divCol = document.createElement("div");
    divCol.className = "col";
    divRow.appendChild(divCol);

    const divCard = document.createElement("div");
    divCard.className = "card";
    divCard.style.width = "20rem";
    divCol.appendChild(divCard);

    const image = document.createElement("img");
    image.className = "card-img-top";
    image.setAttribute('src', 'http://www.azspagirls.com/files/2010/09/orange.jpg');
    divCard.appendChild(image);

    const divCardBlock = document.createElement("div");
    divCardBlock.className = "card-block";
    divCard.appendChild(divCardBlock);

    const cardTitle = document.createElement("h4");
    cardTitle.className = "card-title";
    cardTitle.innerHTML = 'Orange';
    divCardBlock.appendChild(cardTitle);

    const pPrice = document.createElement("p");
    pPrice.className = "card-text";
    pPrice.innerHTML = 'Price: $0.5';
    divCardBlock.appendChild(pPrice);

    const a = document.createElement('a');
    a.href = '#';
    a.setAttribute("data-name", "Orange");
    a.setAttribute("data-price", "0.5");
    a.className = "add-to-cart btn btn-primary";
    a.innerHTML = "Wybiesz klasę lotu";
    divCardBlock.appendChild(a);

    // insert after

    function insertAfter(referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }

    // add class under certain button

    let button = document.getElementsByTagName("button");

    document.addEventListener("click", function (e) {
        if (!e.target.matches("button")) return;

        let index = [...button].indexOf(e.target);
        myFunction(index)
    }, false);


    function myFunction(index) {
        button = document.getElementsByTagName("button")[index];
        insertAfter(button, divContainer);
    }
}