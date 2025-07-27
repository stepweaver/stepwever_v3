// Weather functionality
const fetchWeather = async (location = 'new york', includeForecast = false) => {
  try {
    // Using OpenWeatherMap API with environment variable
    const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

    // Check if API key is available
    if (!API_KEY || API_KEY === 'your_api_key_here') {
      return [
        `<span class="text-terminal-red">Weather API key not configured</span>`,
        `<span class="text-terminal-yellow">Please add your OpenWeatherMap API key to .env.local</span>`,
      ];
    }

    // First, try to get a list of cities with this name
    const geoResponse = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${API_KEY}`
    );

    if (!geoResponse.ok) {
      throw new Error(`Geocoding service error: ${geoResponse.status}`);
    }

    const geoData = await geoResponse.json();

    if (geoData.length === 0) {
      return [
        `<span class="text-terminal-red">Location not found: ${location}</span>`,
        `<span class="text-terminal-yellow">Usage: weather [city name]</span>`,
      ];
    }

    // If multiple cities found, show a simple numbered list
    if (geoData.length > 1) {
      const optionsList = geoData.map((city, index) =>
        `${index + 1}. ${city.name}, ${city.state || ''} ${city.country}`.trim()
      );

      return [
        `<span class="text-terminal-yellow">Multiple locations found for "${location}":</span>`,
        ...optionsList.map(option => `<span class="text-terminal-text">${option}</span>`),
        ``,
        `<span class="text-terminal-cyan">Type a number (1-${geoData.length}) to select:</span>`
      ];
    }

    // Single city found, get weather data
    const city = geoData[0];
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=imperial&appid=${API_KEY}`
    );

    if (!weatherResponse.ok) {
      throw new Error(`Weather service error: ${weatherResponse.status}`);
    }

    const weatherData = await weatherResponse.json();

    // Format the current weather data
    const currentWeather = [
      `<span class="text-terminal-yellow">Weather for ${weatherData.name}, ${weatherData.sys.country}</span>`,
      `<span class="text-terminal-cyan">Temperature:</span> ${Math.round(
        weatherData.main.temp
      )}°F (feels like ${Math.round(weatherData.main.feels_like)}°F)`,
      `<span class="text-terminal-cyan">Conditions:</span> ${weatherData.weather[0].description}`,
      `<span class="text-terminal-cyan">Humidity:</span> ${weatherData.main.humidity}%`,
      `<span class="text-terminal-cyan">Wind:</span> ${Math.round(
        weatherData.wind.speed
      )} mph`,
    ];

    // If forecast is requested, fetch and add it
    if (includeForecast) {
      try {
        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=imperial&appid=${API_KEY}`
        );

        if (forecastResponse.ok) {
          const forecastData = await forecastResponse.json();
          const dailyForecast = formatDailyForecast(forecastData);
          return [...currentWeather, ``, ...dailyForecast];
        }
      } catch (forecastError) {
        console.error('Forecast fetch error:', forecastError);
        // Continue without forecast if it fails
      }
    }

    return currentWeather;
  } catch (error) {
    return [
      `<span class="text-terminal-red">Error fetching weather data: ${error.message}</span>`,
      `<span class="text-terminal-yellow">Usage: weather [location]</span> (e.g., weather london)`,
    ];
  }
};

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

// Function to fetch weather using geolocation or default to New York
const fetchWeatherWithGeolocation = async (includeForecast = false) => {
  try {
    const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

    if (!API_KEY || API_KEY === 'your_api_key_here') {
      return [
        `<span class="text-terminal-red">Weather API key not configured</span>`,
        `<span class="text-terminal-yellow">Please add your OpenWeatherMap API key to .env.local</span>`,
      ];
    }

    // Check if geolocation is available
    if (!navigator.geolocation) {
      return await fetchWeather('new york', includeForecast);
    }

    // Try to get user's location
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;

            // Fetch current weather directly using coordinates
            const weatherResponse = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${API_KEY}`
            );

            if (!weatherResponse.ok) {
              throw new Error(`Weather service error: ${weatherResponse.status}`);
            }

            const weatherData = await weatherResponse.json();

            // Use the weather data name which should be the city name
            let locationDisplay = `${weatherData.name}, ${weatherData.sys.country}`;

            // Try to get state information using reverse geocoding
            try {
              const reverseGeoResponse = await fetch(
                `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`
              );

              if (reverseGeoResponse.ok) {
                const reverseGeoData = await reverseGeoResponse.json();
                if (reverseGeoData.length > 0) {
                  const location = reverseGeoData[0];
                  // Use the weather data city name but add state from reverse geocoding
                  locationDisplay = `${weatherData.name}, ${location.state || ''} ${weatherData.sys.country}`.trim();
                }
              }
            } catch (error) {
              // If reverse geocoding fails, just use the weather data name
              console.error('Reverse geocoding error:', error);
            }

            const currentWeather = [
              `<span class="text-terminal-yellow">Weather for ${locationDisplay} (Your Location)</span>`,
              `<span class="text-terminal-cyan">Temperature:</span> ${Math.round(
                weatherData.main.temp
              )}°F (feels like ${Math.round(weatherData.main.feels_like)}°F)`,
              `<span class="text-terminal-cyan">Conditions:</span> ${weatherData.weather[0].description}`,
              `<span class="text-terminal-cyan">Humidity:</span> ${weatherData.main.humidity}%`,
              `<span class="text-terminal-cyan">Wind:</span> ${Math.round(
                weatherData.wind.speed
              )} mph`,
            ];

            // If forecast is requested, fetch and add it
            if (includeForecast) {
              try {
                const forecastResponse = await fetch(
                  `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${API_KEY}`
                );

                if (forecastResponse.ok) {
                  const forecastData = await forecastResponse.json();
                  const dailyForecast = formatDailyForecast(forecastData);
                  resolve([...currentWeather, ``, ...dailyForecast]);
                  return;
                }
              } catch (forecastError) {
                console.error('Forecast fetch error:', forecastError);
                // Continue without forecast if it fails
              }
            }

            resolve(currentWeather);
          } catch (error) {
            // If there's an error with the API call, fall back to New York
            console.error('Error fetching weather for user location:', error);
            const fallbackWeather = await fetchWeather('new york', includeForecast);
            resolve(fallbackWeather);
          }
        },
        async (error) => {
          // If geolocation fails, fall back to New York
          console.error('Geolocation error:', error);
          const fallbackWeather = await fetchWeather('new york', includeForecast);
          resolve(fallbackWeather);
        },
        {
          timeout: 10000, // 10 second timeout
          enableHighAccuracy: false, // Don't need high accuracy for weather
          maximumAge: 300000 // Cache for 5 minutes
        }
      );
    });
  } catch (error) {
    // If anything goes wrong, fall back to New York
    return await fetchWeather('new york', includeForecast);
  }
};

export { fetchWeather, fetchWeatherWithGeolocation }; 