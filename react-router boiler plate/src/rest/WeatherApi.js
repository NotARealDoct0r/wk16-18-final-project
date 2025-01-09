// imported react + 2 functions
import React, { useEffect, useState } from 'react';

// function to call weather data from API
const WeatherForecast = () => {
  const [weatherData, setWeatherData] = useState(null);

  // created an async function to request and retrieve data from an API (to display local / Boston's weather)
  useEffect(() => {
    const fetchData = async () => {
      const url = 'https://weatherapi-com.p.rapidapi.com/forecast.json?q=Boston&days=3';
      const options = {
        method: 'GET',
        // the header displays data (similar to console log / backend)
        headers: {
          'X-RapidAPI-Key': '9d6a05c4d2msh6fb4dc96d789718p1e9b01jsn03a53a16122a',
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        // Parse the response as JSON
        const result = await response.json();
        // Store the parsed JSON in the component's state 
        setWeatherData(result); 
      } catch (error) {
        console.error(error);
      }
    };

    // calling the function to retrieve/fetch data
    fetchData();
  }, []);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <div>
        {/* headers with styled text + retrieving weather data from API */}
        <br/><h1 style={{ color: 'black' }}>Weather Forecast</h1>
        {weatherData ? (
          <div><br/>
            <h2 style={{ color: 'white', fontWeight: 'bold' }}>Location: {weatherData.location.name}</h2>
            <h3 style={{ color: 'white', fontWeight: 'bold' }}>Current Weather: {weatherData.current.condition.text}</h3>
            <p style={{ color: 'red', fontWeight: 'bold' }}>Temperature: {weatherData.current.temp_f}°F</p>
            <p style={{ color: 'blue', fontWeight: 'bold' }}>Humidity: {weatherData.current.humidity}%</p>
          </div>
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>
    <div>
      {weatherData ? (
        <div>
          <br/><h3 style={{ color: 'black', fontWeight: 'bold' }}>3 Day Forecast:</h3>
          <br/><ul>
            {weatherData.forecast.forecastday.map((forecastDay) => (
              <li key={forecastDay.date}>
                <h4 style={{ color: 'white' }}>Date: {forecastDay.date}</h4>
                <p style={{ color: 'red', fontWeight: 'bold' }}>Max Temperature: {forecastDay.day.maxtemp_f}°F</p>
                <p style={{ color: 'blue', fontWeight: 'bold' }}>Min Temperature: {forecastDay.day.mintemp_f}°F</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  </div>
  );
};

export default WeatherForecast;
