async function moduleProject4() {
  const footer = document.querySelector('footer');
  const currentYear = new Date().getFullYear();
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`;

  const descriptions = [
    ["Sunny", "☀️"],
    ["Cloudy", "☁️"],
    ["Rainy", "🌧️"],
    ["Thunderstorm", "⛈️"],
    ["Snowy", "❄️"],
    ["Partly Cloudy", "⛅️"]
  ];

  const weatherWidget = document.querySelector('#weatherWidget');
  weatherWidget.style.display = 'none';

  const citySelect = document.querySelector('#citySelect');
  citySelect.addEventListener('change', async (evt) => {
    const selectedCity = evt.target.value;
    console.log('selection changed:', selectedCity);

    try {
      citySelect.setAttribute('disabled', 'disabled');
      weatherWidget.style.display = 'none';
      const info = document.querySelector('.info');
      info.textContent = 'Fetching weather data...';

      const url = `http://localhost:3003/api/weather?city=${encodeURIComponent(selectedCity)}`;
      const response = await axios.get(url);
      const data = response.data;

      info.textContent = '';
      citySelect.removeAttribute('disabled');
      weatherWidget.style.display = 'block';

      const emojiMatch = descriptions.find(pair => pair[0] === data.description);
      const emoji = emojiMatch ? emojiMatch[1] : '';
      const dayOfWeek = new Date(data.date).toLocaleDateString('en-US', { weekday: 'long' });

      document.querySelector('#apparentTemp').textContent = data.temperature;
      document.querySelector('#cityName').textContent = data.city;
      document.querySelector('#currentTemp').textContent = data.temperature;
      document.querySelector('#highTemp').textContent = data.high;
      document.querySelector('#lowTemp').textContent = data.low;
      document.querySelector('#precipitationProb').textContent = data.precipitation;
      document.querySelector('#weatherEmoji').textContent = emoji;
      document.querySelector('#descriptionText').textContent = data.description;
      document.querySelector('#currentDate').textContent = dayOfWeek;
    } catch (error) {
      console.error('Error fetching weather data:', error.message);
      document.querySelector('.info').textContent = 'Failed to load weather data.';
      citySelect.removeAttribute('disabled');
    }
  });
}

if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject4 };
else moduleProject4();