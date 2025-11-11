const WEATHER_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=51.1801&longitude=71.446&daily=temperature_2m_max,temperature_2m_min,snowfall_sum,rain_sum&current=temperature_2m,weather_code&timezone=auto';

const weatherBox = document.getElementById('weather-box');

function getWeatherText(rawCode) {
  const code = Number(rawCode); // just in case it comes as a string

  if (code === 0) return 'Clear sky';
  if ([1, 2, 3].includes(code)) return 'Partly cloudy / overcast';
  if ([45, 48].includes(code)) return 'Foggy';

  if ([51, 53, 55, 56, 57].includes(code)) return 'Drizzle';
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'Rain';
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'Snow / snow showers';

  if ([95, 96, 99].includes(code)) return 'Thunderstorm';

  return `Unknown conditions (code ${code})`;
}

async function loadWeather() {
  try {
    const res = await fetch(WEATHER_URL);
    if (!res.ok) throw new Error('Weather request failed');

    const data = await res.json();

    const current = data.current;
    const daily = data.daily;

    const nowTemp = Math.round(current.temperature_2m);
    const nowCode = current.weather_code;
    const maxTemp = Math.round(daily.temperature_2m_max[0]);
    const minTemp = Math.round(daily.temperature_2m_min[0]);
    const rain = daily.rain_sum[0];
    const snow = daily.snowfall_sum[0];

    const desc = getWeatherText(nowCode);

    weatherBox.innerHTML = `
      <div class="weather-desc">Now: <strong>${nowTemp}°C</strong> — ${desc}</div>
      <div class="weather-metrics">
        <div class="metric">
          <div class="label">Max</div>
          <div class="value">${maxTemp}°C</div>
        </div>
        <div class="metric">
          <div class="label">Min</div>
          <div class="value">${minTemp}°C</div>
        </div>
        <div class="metric">
          <div class="label">Rain</div>
          <div class="value">${rain} mm</div>
        </div>
        <div class="metric">
          <div class="label">Snow</div>
          <div class="value">${snow} mm</div>
        </div>
      </div>
      <p class="weather-tip">
        ${
          rain > 0 || snow > 0
            ? 'It’s wet outside – perfect time for a hot towel and beard care 🔥'
            : 'Great weather to freshen up your haircut 💈'
        }
      </p>
    `;
  } catch (err) {
    console.error(err);
    weatherBox.classList.add('weather-error');
    weatherBox.textContent = 'Failed to load weather data.';
  }
}

loadWeather();