//Variaveis e seleção de elementos
const apiKey = "486842a84e08929c11512b9b2ad1b176";
const apiCountryURL = "https://flagsapi.com/{country_code}/{style}/{size}.png"

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const desceElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const umidityElement = document.querySelector("#umidity span");
const windElement = document.querySelector("#wind span");

//Funções
const getWeatherData = async(city) =>{
    const apiWeatherURL = `https://api.openweathermap.org/data/3.0/onecall?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
    
    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    return data;

};

const showWeatherData =  async (city) => {
    const data = await getWeatherData(city);

    cityElement.innerText = data.name;
};

function getFlagURL(countryCode, style = "flat", size = "64") {
    return apiCountryURL
        .replace("{country_code}", countryCode)
        .replace("{style}", style)
        .replace("{size}", size);
};

//Eventos
searchBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const city = cityInput.value;

    showWeatherData(city);
});