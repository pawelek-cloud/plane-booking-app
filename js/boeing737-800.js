const passenger=sessionStorage.getItem('PASSENGERS');
console.log(passenger);
const arrivalPlace=sessionStorage.getItem('ARRIVALPLACE');
console.log(arrivalPlace)






window.addEventListener("beforeunload", function (event) {
    event.returnValue = "Are you sure?";
});

document.getElementById("returnButton").addEventListener("click", function goBack() {

    history.back(-1);
})