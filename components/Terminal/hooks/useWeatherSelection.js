import { useState, useCallback } from 'react';

export const useWeatherSelection = (setLines, setInput, setCursorPosition) => {
  const [isInSelectionMode, setIsInSelectionMode] = useState(false);
  const [selectionLocation, setSelectionLocation] = useState('');
  const [selectionOptions, setSelectionOptions] = useState([]);

  const resetSelection = useCallback(() => {
    setIsInSelectionMode(false);
    setSelectionLocation('');
    setSelectionOptions([]);
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
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${selectedCity.lat}&lon=${selectedCity.lon}&units=imperial&appid=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`Weather service error: ${response.status}`);
      }

      const weatherData = await response.json();

      // Replace loading message with weather data
      const weatherOutput = [
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

      setLines(prev => [...prev.slice(0, -1), ...weatherOutput]);
    } catch (error) {
      setLines(prev => [
        ...prev.slice(0, -1),
        `<span class="text-terminal-red">Error fetching weather data: ${error.message}</span>`,
      ]);
    }

    setInput('');
    setCursorPosition(0);
  }, [selectionOptions, setLines, setInput, setCursorPosition]);

  const setupSelectionMode = useCallback(async (location) => {
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