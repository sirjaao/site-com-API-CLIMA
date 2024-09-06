"use strict";

const apikey = "";
const apiCountryURL = "https://flagcdn.com/32x24/";
const unsplashAccessKey = ""; // Insira sua chave de acesso do Unsplash
const unsplashAPI = "https://api.unsplash.com/search/photos?query=";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#Temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");

const getWeatherData = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();
    
    return data;
}

const getCityImage = async (city) => {
    const unsplashURL = `${unsplashAPI}${city}&client_id=${unsplashAccessKey}&orientation=landscape`;

    const res = await fetch(unsplashURL);
    const data = await res.json();

    return data.results[0].urls.regular; // URL da primeira imagem encontrada
}

const showWeatherData = async (city) => {
   const data = await getWeatherData(city);

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

   // Adiciona a imagem de fundo
   const cityImageUrl = await getCityImage(city);
   document.body.style.backgroundImage = `url(${cityImageUrl})`;

   weatherContainer.classList.remove("hide");
}

// Eventos
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const city = cityInput.value;
    showWeatherData(city); 
});

cityInput.addEventListener("keyup", (e) => {
    if(e.code === "Enter") {
        const city = e.target.value;
        showWeatherData(city);
    }
});
