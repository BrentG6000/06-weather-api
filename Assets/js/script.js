const formEl = $('#location-form');
const cityInputEl = $('#city-input');

const ApiKey = "5050a3ebd6991b9594e93c4effbeb11c";
let cityInput;
let geoApi = "http://api.openweathermap.org/geo/1.0/direct?q=";
let forecastApi = "http://api.openweathermap.org/data/2.5/forecast?lat=";
let currentWeatherApi = "https://api.openweathermap.org/data/2.5/weather?lat=";
let lat;
let long;
let forecast = [];
let currentWeather = {
    temp: "",
    humidity: "",
    wind: ""
};

let handleFormSubmit = e => {
    e.preventDefault();

    let cityInput = cityInputEl.val();
    console.log(cityInput);
    let newGeoApi = geoApi + cityInput + "&limit=1&appid=" + ApiKey;
    fetch(newGeoApi)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function (locRes) {
            console.log(locRes[0].lat, locRes[0].lon);
            lat = locRes[0].lat;
            long = locRes[0].lon;        
            let newForecastApi = forecastApi + lat + "&lon=" + long + "&appid=" + ApiKey + "&units=imperial";

            fetch(newForecastApi)
                .then(function (response) {
                    if (!response.ok) {
                        throw response.json();
                    }
                    return response.json();
                 })
                .then(function (forecastData) {
                    for (let i = 0; i < forecastData.list.length; i++) {
                        var unixFormat = moment.unix(forecastData.list[i].dt).format("MMM Do, YYYY, hh:mm:ss");
                        
                        let forecastObject = {
                            time: unixFormat,
                            temp: forecastData.list[i].main.temp,
                            humidity: forecastData.list[i].main.humidity,
                            wind: forecastData.list[i].wind.speed
                        };
                        
                        forecast.push(forecastObject);
                    }
                })
            
            fetch(currentWeatherApi + lat + "&lon=" + long + "&" + "appid=" + ApiKey + "&units=imperial")
                .then(function (response) {
                    if (!response.ok) {
                        throw response.json();
                    }
                    return response.json();
                })
                .then(function (currentWeatherData) {
                    currentWeather.temp = currentWeatherData.main.temp;
                    currentWeather.humidity = currentWeatherData.main.humidity;
                    currentWeather.wind = currentWeatherData.wind.speed;
                    console.log(currentWeather);
            })
        })
}

formEl.on('submit', handleFormSubmit);