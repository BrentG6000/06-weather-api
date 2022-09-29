const formEl = $('#location-form');
const cityInputEl = $('#city-input');
let weatherEl = $('#weather-info');

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
                        let hour = moment.unix(forecastData.list[i].dt).format("H");
                        let dayOfTheMonth = moment.unix(forecastData.list[i].dt).format("MMM Do");
                        let hourStr;

                        if (hour > 12) {
                            hour -= 12;
                            hourStr = hour + 'pm'
                        }
                        else if (hour == 12) {
                            hourStr = hour + 'pm'
                        }
                        else {
                            hourStr = hour + 'am'
                        }


                        let forecastObject = {
                            day: dayOfTheMonth,
                            time: hourStr,
                            temp: forecastData.list[i].main.temp,
                            humidity: forecastData.list[i].main.humidity,
                            wind: forecastData.list[i].wind.speed
                        };
                        
                        forecast.push(forecastObject);
                    }

                    for (let i = 0; i < forecast.length; i++) {
                        

                        if (i == 0 || forecast[i].day !== forecast[i - 1].day) {
                            let dateEl = $('<div>').attr('border-top', '1px solid black').text(forecast[i].day);
                            weatherEl.append(dateEl);
                        } 

                        let timeEL = $('<div>').text(forecast[i].time + ' '
                            + forecast[i].temp + ' ' + forecast[i].humidity + ' ' + forecast[i].wind);
                        weatherEl.append(timeEL);
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