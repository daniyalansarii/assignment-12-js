const fetchData = async (event) => {
  event.preventDefault();

  const input = document.getElementById("input");
  const errorMessage = document.getElementById("error-message");
  const searchBtn = document.getElementById("search-btn");

  const city = input.value.trim();

  errorMessage.innerText = "";

  if (!city) {
    errorMessage.innerText = "Please enter a city name.";
    return;
  }

  try {
    searchBtn.innerText = "Searching...";
    searchBtn.disabled = true;

    const api = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=60e0a3d2f152486e950213038260606&q=${encodeURIComponent(city)}`,
    );

    const res = await api.json();

    if (!api.ok || res.error) {
      throw new Error(res.error?.message || "Unable to get weather data.");
    }

    document.getElementById("city").innerText = res.location.name;

    document.getElementById("country").innerText = res.location.country;

    document.getElementById("temp").innerText = res.current.temp_c + "°C";

    document.getElementById("condition").innerText = res.current.condition.text;

    document.getElementById("weather-icon").src =
      "https:" + res.current.condition.icon;

    document.getElementById("humidity").innerText = res.current.humidity + "%";

    document.getElementById("wind").innerText = res.current.wind_kph + " km/h";

    document.getElementById("feels").innerText = res.current.feelslike_c + "°C";
  } catch (error) {
    console.log(error);

    errorMessage.innerText = error.message;

    document.getElementById("city").innerText = "";
    document.getElementById("country").innerText = "";
    document.getElementById("temp").innerText = "";
    document.getElementById("condition").innerText = "";
    document.getElementById("humidity").innerText = "";
    document.getElementById("wind").innerText = "";
    document.getElementById("feels").innerText = "";

    document.getElementById("weather-icon").src = "";
  } finally {
    searchBtn.innerText = "Search";
    searchBtn.disabled = false;
  }
};
