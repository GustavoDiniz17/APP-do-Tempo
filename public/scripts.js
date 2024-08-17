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
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");

const errorMessage = document.createElement("p");
errorMessage.className = "error-message";
errorMessage.style.color = "white";
errorMessage.style.display = "none";
errorMessage.style.fontFamily = "'Roboto', sans-serif";
errorMessage.style.fontSize = "16px";
document.querySelector(".form").appendChild(errorMessage);

//Funções
const getWeatherData = async (city) =>{
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
    try {
        const res = await fetch(apiWeatherURL);
        const data = await res.json();

        if (data.cod === "404") {
            throw new Error("Cidade não encontrada!");
        }

        return data;
    } catch (error) {
        showError(error.message);
        weatherContainer.classList.add('hide'); 
    }

};

const showWeatherData =  async (city) => {
    const data = await getWeatherData(city);

    if (!data) return;

    hideError();

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    desceElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    const flagURL = getFlagURL(data.sys.country);
    countryElement.setAttribute("src", flagURL);
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed} km/h`;

    weatherContainer.classList.remove('hide');
};

function getFlagURL(countryCode, style = "flat", size = "64") {
    return apiCountryURL
        .replace("{country_code}", countryCode)
        .replace("{style}", style)
        .replace("{size}", size);
}

function showError(message) {
    errorMessage.innerText = message;
    errorMessage.style.display = "block";
    weatherContainer.classList.add('hide'); // Esconder os dados do tempo
}

function hideError() {
    errorMessage.style.display = "none";
}

//Eventos
searchBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const city = cityInput.value;

    showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) =>{

    if(e.code === "Enter"){
        const city = e.target.value;

        showWeatherData(city);
    }
 });