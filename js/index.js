
// current date


let currentDate = new Date();
let dd = currentDate.getDate();
let mm = currentDate.getMonth() + 1;
let yyyy = currentDate.getFullYear();

dd < 10 ? dd = "0" + dd : null;
mm < 10 ? mm = "0" + mm : null;
let currentDateString = yyyy + '-' + mm + '-' + dd;

document.getElementById("departureDate").setAttribute("min", currentDateString)

document.getElementById("departureDate").setAttribute("value", currentDateString)

// Next current date

let date = new Date(),
    d = date.getDate(),
    m = date.getMonth(),
    y = date.getFullYear();


let nextDate = new Date(y, m, d + 1)

d = nextDate.getDate(),
    m = nextDate.getMonth() + 1,
    y = nextDate.getFullYear();

d < 10 ? d = "0" + d : null;
m < 10 ? m = "0" + m : null;

nextDate = y + '-' + m + '-' + d;

document.getElementById("arrivalDate").setAttribute("min", nextDate)

document.getElementById("arrivalDate").setAttribute("value", nextDate)


// changing date


document.getElementById("departureDate").addEventListener("change", changeDate)


function changeDate() {

    function incDay(date, n) {
        var fudate = new Date(new Date(date).setDate(new Date(date).getDate() + n));

        let m = fudate.getMonth() + 1;

        m < 10 ? m = "0" + m : null;

        fudate = fudate.getFullYear() + '-' + m + '-' + fudate.toDateString().substring(8, 10);
        return fudate;
    }

    let departureDate = new Date(document.getElementById('departureDate').value);

    var tomorrow = incDay(departureDate, 1);

    document.getElementById("arrivalDate").value = tomorrow;


    document.getElementById("arrivalDate").setAttribute("min", tomorrow)

}


// weather

const select = document.getElementById("arrivalPlace"),
    showOption = document.getElementById("option-selected");

select.addEventListener("change", function () {

    const city = this.value;

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.value}&cnt=5&appid=ecd6ba7cde8d46460f0cdb7d0b261058`)
        .then((resp) => resp.json())
        .then(function (data) {
            console.log(data)

            let weatherIcon = data.weather[0].icon

            showOption.innerHTML = `temperatura aktualna ${city} ${data.weather[0].main} ${(data.main.temp-273.15).toFixed(1)} &#x2103 temperatura odczuwalna ${(data.main.feels_like-273.15).toFixed(1)} &#x2103`;

            let icons = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`

            document.getElementById("weatherIcon").setAttribute("src", icons)

        })

})

// submit button 

function sendData() {

    const departureTime = document.getElementById("departureDate").value

    const arrivalTime = document.getElementById("arrivalDate").value

    const city = document.getElementById("arrivalPlace").value;

    const departurePlace = document.getElementById("departurePlace").value;

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

    fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/PL/PLN/en-PL/${transformCity}-sky/${transformedCityName}-sky/${departureTime}?inboundpartialdate=${arrivalTime}`, {
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

/* disable arrivalDate option if oneway chosen */

const oneWay = document.getElementById("oneWay")

oneWay.addEventListener("click", function twoWaysDisabled() {

    const arrival1 = document.getElementById("arrivalDate")

    arrival1.setAttribute("disabled", "")

    const twoWays = document.getElementById("twoWays")

    twoWays.addEventListener("click", function () {

        arrival1.removeAttribute("disabled")

    })
})