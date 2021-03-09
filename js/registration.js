window.addEventListener("load", () => {
    const params = (new URL(document.location)).searchParams

    const departurePlace = params.get("departurePlace");
    const arrivalPlace = params.get("arrivalPlace");
    const departureDate = params.get("departureDate");
    const arrivalDate = params.get("arrivalDate")

    document.getElementById("departurePlace").innerHTML = departurePlace;
    document.getElementById("arrivalPlace").innerHTML = arrivalPlace;
    document.getElementById("departureDate").innerHTML = departureDate;
    document.getElementById("arrivalDate").innerHTML = arrivalDate;

    // submit button 

    function sendData() {

        const city=arrivalPlace;

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
        const transformedCityName = changeCityNameToAirportName(city);

        const transformCity = changeCityNameToAirportName(departurePlace)

        fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/PL/PLN/en-PL/${transformCity}-sky/${transformedCityName}-sky/${departureDate}?inboundpartialdate=${arrivalDate}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": "66b4be106amsh70082ce762891bcp1e18a4jsnf50eb105953a",
                    "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
                }
            })
            .then((resp) => resp.json())
            .then(function (data) {
                console.log(data)
            })

    }
    sendData();

})