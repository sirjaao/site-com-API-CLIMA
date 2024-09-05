"use strict";

const apikey = "";
const apiCountryURL = "https://flagcdn.com/w40/";//

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

// Corrija "docement" para "document"
const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#Temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");

// Funções
const getWeatherData = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();
    
    return data;
}

const showWeatherData = async (city) => {
   const data = await getWeatherData(city); // Corrigido: apiWeartherURL não é uma função

   const countryCode = data.sys.country;
   const countryCodeLower = countryCode.toLowerCase();

   cityElement.innerText = data.name;
   tempElement.innerText = parseInt(data.main.temp);
   descElement.innerText = data.weather[0].description;
   weatherIconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
   );
   countryElement.setAttribute("src", apiCountryURL + countryCodeLower + ".png");
   humidityElement.innerText = `${data.main.humidity}%`;
   windElement.innerText = `${data.wind.speed}km/h`;

   weatherContainer.classList.remove("hide");
   
   console.log("url:", countryElement)

}

// Eventos
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const city = cityInput.value;
    console.log(city);
    showWeatherData(city); // Mostra dados do tempo ao clicar
});

cityInput.addEventListener("keyup", (e) => {

    if(e.code === "Enter") {
        const city = e.target.value;

        showWeatherData(city);
    }
})