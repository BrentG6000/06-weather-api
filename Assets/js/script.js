const formEl = $('#location-form');
const cityInputEl = $('#city-input');

const ApiKey = "5050a3ebd6991b9594e93c4effbeb11c";
let cityInput;
//let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + ApiKey;
let geoUrl = "http://api.openweathermap.org/geo/1.0/direct?q=";

let handleFormSubmit = e => {
    e.preventDefault();

    let cityInput = cityInputEl.val();
    console.log(cityInput);
    console.log(geoUrl + cityInput + "&limit=1&appid=" + ApiKey);
    fetch(geoUrl).then(function (response) {
        if (!response.ok) {
            throw response.json();
        }

        return response.json();
    }).then(function (locRes) {
        // write query to page so user knows what they are viewing
        

        console.log(locRes);
    })
}

formEl.on('submit', handleFormSubmit);