const invalid = "";

function validate() {
    const departurePlace = document.getElementById("departurePlace");


    const invalid = departurePlace.value == "";
    if (invalid) {

        departurePlace.className = "error";
        document.getElementById("errorMessage").innerHTML = "Wybierz miasto wylotu";
        document.getElementById("errorMessage").className = "error1";

    } else {
        departurePlace.className = "";
        document.getElementById("errorMessage").innerHTML = "";
    }
    return !invalid
}

function validate1() {

    const arrivalPlace = document.getElementById('arrivalPlace');
    const invalid = arrivalPlace.value == "";
    if (invalid) {

        arrivalPlace.className = "error";
        document.getElementById("errorMessage1").innerHTML = "Wybierz miasto przylotu";
        document.getElementById("errorMessage1").className = "error1";

    } else {
        arrivalPlace.className = "";
        document.getElementById("errorMessage1").innerHTML = "";
    }
    return !invalid

}

const validateInputFields = document.getElementById('submitButton');

validateInputFields.addEventListener('click', function () {

    validate();
    validate1();

    if (validate() === !invalid && validate1() === !invalid) {


        function openWindow() {
            window.open("registration.html", "")

        }
        openWindow();

        // function redirect() {
        //     window.location.replace("registration.html")
        // }

        // redirect();

        sendData();

        
    }

})