const formEl = $('#location-form');
const cityInputEl = $('#city-input');

const ApiKey = "770feb5c85305a6a60e2a4039cf09a54";
let cityInput;
//let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + ApiKey;
let geoUrl = "http://api.openweathermap.org/geo/1.0/direct?q=";

let handleFormSubmit = e => {
    e.preventDefault();

    let cityInput = cityInputEl.val();
    console.log(cityInput);
    console.log(geoUrl + cityInput + "&limit=1&appid=" + ApiKey);
    //fetch(geoUrl);
}

formEl.on('submit', handleFormSubmit);