fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/PL/PLN/en-PL/WAW-sky/LHR-sky/2021-03-10?inboundpartialdate=2021-12-01", {
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