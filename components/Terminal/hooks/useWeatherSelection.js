import { useState, useCallback } from 'react';

export const useWeatherSelection = (setLines, setInput, setCursorPosition) => {
  const [isInSelectionMode, setIsInSelectionMode] = useState(false);
  const [selectionLocation, setSelectionLocation] = useState('');
  const [selectionOptions, setSelectionOptions] = useState([]);
  const [includeForecast, setIncludeForecast] = useState(false);

  const resetSelection = useCallback(() => {
    setIsInSelectionMode(false);
    setSelectionLocation('');
    setSelectionOptions([]);
    setIncludeForecast(false);
  }, []);

  const handleSelectionInput = useCallback(async (command) => {
    const selectionNumber = parseInt(command.trim());

    if (isNaN(selectionNumber) || selectionNumber < 1 || selectionNumber > selectionOptions.length) {
      setLines(prev => [
        ...prev,
        `<span class="text-terminal-red">Invalid selection. Please choose a number between 1 and ${selectionOptions.length}, or type 'cancel' to exit</span>`,
      ]);
      setInput('');
      setCursorPosition(0);
      return;
    }

    // User selected a valid option
    setIsInSelectionMode(false);

    // Show loading message
    const loadingLine = `<span class="text-terminal-yellow">Fetching weather for ${selectionOptions[selectionNumber - 1].display
      }...</span>`;
    setLines(prev => [...prev, loadingLine]);

    // Fetch weather for selected location
    try {
      const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
      const selectedCity = selectionOptions[selectionNumber - 1];

      // Fetch current weather
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${selectedCity.lat}&lon=${selectedCity.lon}&units=imperial&appid=${API_KEY}`
      );

      if (!weatherResponse.ok) {
        throw new Error(`Weather service error: ${weatherResponse.status}`);
      }

      const weatherData = await weatherResponse.json();

      // Format current weather data
      const currentWeather = [
        `<span class="text-terminal-yellow">Weather for ${selectedCity.display}</span>`,
        `<span class="text-terminal-cyan">Temperature:</span> ${Math.round(
          weatherData.main.temp
        )}°F (feels like ${Math.round(weatherData.main.feels_like)}°F)`,
        `<span class="text-terminal-cyan">Conditions:</span> ${weatherData.weather[0].description}`,
        `<span class="text-terminal-cyan">Humidity:</span> ${weatherData.main.humidity}%`,
        `<span class="text-terminal-cyan">Wind:</span> ${Math.round(
          weatherData.wind.speed
        )} mph`,
      ];

      let finalOutput = currentWeather;

      // If forecast is requested, fetch and add it
      if (includeForecast) {
        try {
          const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${selectedCity.lat}&lon=${selectedCity.lon}&units=imperial&appid=${API_KEY}`
          );

          if (forecastResponse.ok) {
            const forecastData = await forecastResponse.json();
            const dailyForecast = formatDailyForecast(forecastData);
            finalOutput = [...currentWeather, ``, ...dailyForecast];
          }
        } catch (forecastError) {
          console.error('Forecast fetch error:', forecastError);
          // Continue without forecast if it fails
        }
      }

      setLines(prev => [...prev.slice(0, -1), ...finalOutput]);
    } catch (error) {
      setLines(prev => [
        ...prev.slice(0, -1),
        `<span class="text-terminal-red">Error fetching weather data: ${error.message}</span>`,
      ]);
    }

    setInput('');
    setCursorPosition(0);
  }, [selectionOptions, includeForecast, setLines, setInput, setCursorPosition]);

  // Function to format daily forecast data
  const formatDailyForecast = (forecastData) => {
    const dailyData = {};

    // Group forecast data by day
    forecastData.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const dayKey = date.toDateString();

      if (!dailyData[dayKey]) {
        dailyData[dayKey] = {
          date: date,
          temps: [],
          conditions: [],
          humidity: [],
          wind: []
        };
      }

      dailyData[dayKey].temps.push(item.main.temp);
      dailyData[dayKey].conditions.push(item.weather[0].description);
      dailyData[dayKey].humidity.push(item.main.humidity);
      dailyData[dayKey].wind.push(item.wind.speed);
    });

    // Format the forecast output
    const forecastOutput = [
      `<span class="text-terminal-green">5-Day Forecast:</span>`,
    ];

    // Get next 5 days (skip today)
    const sortedDays = Object.keys(dailyData).sort();
    const next5Days = sortedDays.slice(1, 6);

    next5Days.forEach(dayKey => {
      const dayData = dailyData[dayKey];
      const date = dayData.date;
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      const monthDay = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

      const minTemp = Math.round(Math.min(...dayData.temps));
      const maxTemp = Math.round(Math.max(...dayData.temps));

      // Get most common condition for the day
      const conditionCounts = {};
      dayData.conditions.forEach(condition => {
        conditionCounts[condition] = (conditionCounts[condition] || 0) + 1;
      });
      const mostCommonCondition = Object.keys(conditionCounts).reduce((a, b) =>
        conditionCounts[a] > conditionCounts[b] ? a : b
      );

      forecastOutput.push(
        `<span class="text-terminal-cyan">${dayName} ${monthDay}:</span> ${minTemp}°F - ${maxTemp}°F, ${mostCommonCondition}`
      );
    });

    return forecastOutput;
  };

  const setupSelectionMode = useCallback(async (location, forecast = false) => {
    const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

    try {
      const geoResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${API_KEY}`
      );

      if (geoResponse.ok) {
        const geoData = await geoResponse.json();
        if (geoData.length > 1) {
          setIsInSelectionMode(true);
          setSelectionLocation(location);
          setIncludeForecast(forecast);
          setSelectionOptions(
            geoData.map((city, index) => ({
              id: index,
              name: city.name,
              state: city.state || '',
              country: city.country,
              lat: city.lat,
              lon: city.lon,
              display: `${city.name}, ${city.state || ''} ${city.country
                }`.trim(),
            }))
          );
        }
      }
    } catch (error) {
      console.error('Error setting up selection mode:', error);
    }
  }, []);

  return {
    isInSelectionMode,
    selectionOptions,
    handleSelectionInput,
    resetSelection,
    setupSelectionMode,
  };
}; 