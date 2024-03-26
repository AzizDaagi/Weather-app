const apiKey = "8945288390951ce81c59e947cdcb9611";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?&lang=en&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

const weatherIcon = document.querySelector(".weather_icon");

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

async function checkWeather(city) {
  try {
    if (city.toLowerCase() === "touta") {
      document.querySelector(".easterEgg").style.display = "block";
      document.querySelector(".weather").style.display = "none";
      document.querySelector(".error").style.display = "none";
      return;
    }
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }
    var data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "Km/h";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/cloudy.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/sun.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
    } else if (data.weather[0].main == "Snow") {
      weatherIcon.src = "images/snowy.png";
    }
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
    document.querySelector(".easterEgg").style.display = "none";
  } catch (error) {
    console.error(error);
    document.querySelector(".error").style.display = "block";
    document.querySelector(".easterEgg").style.display = "none";
    document.querySelector(".weather").style.display = "none";
  }
}
