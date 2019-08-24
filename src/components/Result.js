import React from 'react';

const Result = (props) => {
  const { date, city, sunrise, sunset, temp, pressure, wind, err } = props.weather;

  let content = null;

  if (!err && city) {
    const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();
    const sunsetTime = new Date(sunset * 1000).toLocaleTimeString();

    content = (
      <div>
        <p>Wyniki wyszukiwania dla <strong>{city}</strong></p>
        <p>Dane dla dnia i godziny <strong>{date}</strong></p>
        <p>Aktualna temperatura: <strong>{temp} &#176;C</strong></p>
        <p>Wschód słońca: <strong>{sunriseTime}</strong></p>
        <p>Zachód słońca: <strong>{sunsetTime}</strong></p>
        <p>Aktualna siła wiatru: <strong>{wind} m/s</strong></p>
        <p>Aktualne ciśnienie: <strong>{pressure} hPa</strong></p>
      </div>
    );
  } else {
    content = null;
  }

  return (
    <div className="result">
      {err ? `Nie mamy w bazie: ${city}` : content}
    </div>
  );
}

export default Result;