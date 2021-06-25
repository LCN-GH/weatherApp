import { useState } from "react";

const api = {
  key: "",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});

  const search = (event) => {
    if (event.key === "Enter") {
      fetch(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setCity("");
          setWeather(result);
          console.log(result);
        });
    }
  };

  const newDate = (d) => {
    let months = [
      "January",
      "Febuary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div className="app">
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Enter a City or Country..."
            onChange={(e) => setCity(e.target.value)}
            value={city}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main !== "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{newDate(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                Min: {Math.round(weather.main.temp_min)}°C - Max:{" "}
                {Math.round(weather.main.temp_max)}°C
              </div>
              <div className="weather">{weather.weather[0].main}</div>
              <div className="weather clouds">
                Cloud cover: {weather.clouds.all}%
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
