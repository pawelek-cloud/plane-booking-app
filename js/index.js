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

let days = ["niedziela", "poniedziałek", "wtorek", "sroda", "czwartek", "piątek", "sobota"];
let month = ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", "lipca", "sierpnia", "wrzesnia", "października", "listopada", "grudnia"];

function displayMinutes() {
  if (currentDate.getMinutes() < 10) {
    return "0" + currentDate.getMinutes();
  } else {
    return currentDate.getMinutes()
  }
}
let today = days[currentDate.getDay()] + " " + currentDate.getDate() + " " + month[currentDate.getMonth()] + " " + currentDate.getFullYear() + " " + currentDate.getHours() + ":" + displayMinutes();
document.getElementById("date").innerHTML = today;


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


showOption = document.getElementById("option-selected");

window.addEventListener("load", function loadWather() {

  const city = "Warszawa";

  fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ecd6ba7cde8d46460f0cdb7d0b261058&lang=en`
    )
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data)
      let image = document.createElement("img");
      image.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      document.getElementById("icon").appendChild(image);

      document.getElementById('city').innerHTML = city;

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

/* disable arrivalDate option if oneway chosen */

const oneWay = document.getElementById("oneWay")

const twoWays = document.getElementById("twoWays")

let arrival1 = document.getElementById("arrivalDate")

oneWay.addEventListener("change", function twoWaysDisabled() {

  arrival1.setAttribute("disabled", "")
  arrival1.setAttribute("checked", "")

})

twoWays.addEventListener("change", function oneWay() {

  arrival1.removeAttribute("disabled")
  arrival1.removeAttribute("checked")

})

// disabled button after reload

window.addEventListener("load", function disabledOnLoad() {

  const oneWaycheckedLoad = document.getElementById("oneWay").checked;
  if (oneWaycheckedLoad) {
    arrival1.setAttribute("disabled", "");
  }
})
const oneWaychecked = document.getElementById("oneWay").checked;
if (oneWaychecked) {
  arrival1.setAttribute("disabled", "");
}

// seatNext
let seatNext = document.getElementById("flexCheckChecked");
seatNext.addEventListener("click", function seatNext(event) {

  let target = event.target;
  let isChecked = document.getElementById("flexCheckChecked").checked;
  if (isChecked) {
    target.setAttribute("checked", "");
  } else {
    target.removeAttribute("checked")
  }
  sessionStorage.setItem("SEATNEXT", isChecked);
})
window.addEventListener("load", function seatNextOnLoad() {
  let isChecked = document.getElementById("flexCheckChecked").checked;
  if (isChecked) {
    seatNext.removeAttribute('checked');
  }
  sessionStorage.setItem("SEATNEXT", isChecked);
  
})