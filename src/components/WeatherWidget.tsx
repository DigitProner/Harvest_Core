import React, { useState, useEffect } from 'react';
import { Cloud, CloudRain, CloudSnow, Sun, Wind } from 'lucide-react';

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  wind: {
    speed: number;
  };
}

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Springfield, IL coordinates
  const lat = 39.7817;
  const lon = -89.6501;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        if (!data || !data.weather || !data.main || !data.wind) {
          throw new Error('Invalid weather data format');
        }
        setWeatherData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherIcon = (weatherMain: string) => {
    switch (weatherMain.toLowerCase()) {
      case 'clouds':
        return <Cloud className="h-8 w-8 text-gray-500" />;
      case 'rain':
        return <CloudRain className="h-8 w-8 text-blue-500" />;
      case 'snow':
        return <CloudSnow className="h-8 w-8 text-blue-300" />;
      case 'clear':
        return <Sun className="h-8 w-8 text-yellow-500" />;
      default:
        return <Cloud className="h-8 w-8 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
        <div className="h-8 w-32 bg-gray-200 rounded mb-4"></div>
        <div className="h-16 w-full bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (error || !weatherData || !weatherData.weather || !weatherData.weather[0]) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Weather</h2>
          <div className="text-sm text-gray-500">Springfield, IL</div>
        </div>
        <p className="text-gray-500">Unable to load weather data</p>
      </div>
    );
  }

  const weatherMain = weatherData.weather[0].main;
  const temp = Math.round(weatherData.main.temp);
  const feelsLike = Math.round(weatherData.main.feels_like);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Weather</h2>
        <div className="text-sm text-gray-500">Springfield, IL</div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {getWeatherIcon(weatherMain)}
          <div>
            <div className="text-3xl font-bold text-gray-900">{temp}°F</div>
            <div className="text-sm text-gray-500">Feels like {feelsLike}°F</div>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Wind className="h-4 w-4" />
            {weatherData.wind.speed} mph
          </div>
          <div className="text-sm text-gray-500">
            Humidity: {weatherData.main.humidity}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;