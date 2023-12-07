const tempDegree = document.querySelector(".temp-degree"),
        locationName = document.querySelector(".location"),
        humidity = document.querySelector(".humidity-percentage"),
        windSpeed = document.querySelector(".windspeed"),
        searchBtn = document.querySelector(".search-btn"),
        searchInput = document.querySelector(".search-input"),
        mainWeather = document.querySelector(".main-weather"),
        errorMessage = document.querySelector(".error");

// const apiKey = "76e8e1ea8dfb7ee9139091a981c17989";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=76e8e1ea8dfb7ee9139091a981c17989"

async function checkWeather(city){
    let response = await fetch(apiURL + `&q=${city}`);
    let data = await response.json(); // to convert the JSON string from response and parse into Javascript object

    if(response.status === 404){
        errorMessage.textContent = "City or Country Is Not Found";
        errorMessage.style.display = "block";
        // remove after 3 secondes
        setTimeout(() => {
            errorMessage.style.display = "none";
        }, 3000);
    }else if(response.status === 400){
        errorMessage.textContent = "Enter Location";
        errorMessage.style.display = "block";
        // remove after 3 seconds
        setTimeout(() => {
            errorMessage.style.display = "none";
        }, 3000);
    }else{
        switch(data.weather[0].main){
            case "Rain":
                mainWeather.src = "./weather-app-img/images/rain.png";
                break;
            case "Clouds":
                mainWeather.src = "./weather-app-img/images/clouds.png";
                break;
            case "Clear":
                mainWeather.src = "./weather-app-img/images/clear.png";
                break;
            case "Dizzle":
                mainWeather.src = "./weather-app-img/images/dizzle.png";
                break;
            case "Mist":
                mainWeather.src = "./weather-app-img/images/mist.png";
                break;
        }
    }
    
    tempDegree.textContent = Math.round(data.main.temp) + "°C";
    locationName.textContent = data.name;
    humidity.textContent = data.main.humidity + " %";
    windSpeed.textContent = data.wind.speed + " km/h"

    console.log(data);
}

searchBtn.addEventListener("click", () => {
    let city = searchInput.value;
    checkWeather(city);
    searchInput.value = "";
})

// function findGeoLocation(){
//     if(navigator.geolocation){
//         navigator.geolocation.getCurrentPosition((position) => {
//             fetch(apiURL)
//             .then(res => res.json())
//             .then(data => {
//                 console.log(data);
//             })
//             // console.log("Latitude " + position.coords.latitude);
//             // console.log("Longtitude " + position.coords.longitude);
//         }, (err) => {
//             alert(err);
//         })
//     }else{
//         console.log("The browser doesn't support geolocation");
//     }
// }

// findGeoLocation();


// https://api.openweathermap.org/data/2.5/weather?q=naypyidaw&appid=76e8e1ea8dfb7ee9139091a981c17989&units=metric