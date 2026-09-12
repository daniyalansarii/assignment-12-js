const fetchData = async (event) => {
  event.preventDefault();

  try {
    let input = document.getElementById("input").value;

    let api = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=2d64b6a72379478d81670448261209&q=${input}`,
    );

    let res = await api.json();

    console.log(res);

    document.getElementById("city").innerText = res.location.name;

    document.getElementById("country").innerText = res.location.country;

    document.getElementById("temp").innerText = res.current.temp_c;

    document.getElementById("condition").innerText = res.current.condition.text;

    document.getElementById("weather-icon").src =
      "https:" + res.current.condition.icon;

    document.getElementById("humidity").innerText = res.current.humidity + "%";

    document.getElementById("wind").innerText = res.current.wind_kph + " km/h";

    document.getElementById("feels").innerText = res.current.feelslike_c + "°C";
  } catch (error) {
    console.log(error);
  }
};
