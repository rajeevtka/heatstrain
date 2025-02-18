// Replace with your OpenWeather API key
const API_KEY = process.env.WEATHER_API_KEY || '01bf0f471d8c9f6e4b65815e07d0eb37';

async function getWeather() {
    const location = document.getElementById('location').value;
    if (!location) {
        alert('Please enter a location');
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`);
        const data = await response.json();

        if (response.ok) {
            updateWeatherDisplay(data);
            assessHeatRisk(data.main.temp, data.main.humidity);
        } else {
            alert('Location not found. Please try again.');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Failed to fetch weather data. Please try again.');
    }
}

function updateWeatherDisplay(data) {
    document.getElementById('temp').textContent = Math.round(data.main.temp);
    document.getElementById('humidity').textContent = data.main.humidity;
    document.getElementById('feels-like').textContent = Math.round(data.main.feels_like);
}

function calculateHeatIndex(temperature, humidity) {
    // Convert Celsius to Fahrenheit for the standard heat index formula
    const tempF = (temperature * 9/5) + 32;
    
    // Rothfusz regression formula
    let heatIndex = -42.379 + (2.04901523 * tempF) + (10.14333127 * humidity) 
        - (0.22475541 * tempF * humidity) - (0.00683783 * tempF * tempF) 
        - (0.05481717 * humidity * humidity) + (0.00122874 * tempF * tempF * humidity) 
        + (0.00085282 * tempF * humidity * humidity) 
        - (0.00000199 * tempF * tempF * humidity * humidity);
    
    // Convert back to Celsius
    return (heatIndex - 32) * 5/9;
}

function assessHeatRisk(temperature, humidity) {
    const warningBox = document.getElementById('warning-box');
    const warningMessage = document.getElementById('warning-message');
    const recommendations = document.getElementById('recommendations');
    
    const heatIndex = calculateHeatIndex(temperature, humidity);
    
    let risk = '';
    let message = '';
    let recommendationsList = [];

    if (heatIndex < 27) {
        risk = 'low';
        message = 'Current conditions are safe for outdoor work.';
        recommendationsList = [
            'Stay hydrated',
            'Take regular breaks as needed'
        ];
    } else if (heatIndex < 32) {
        risk = 'moderate';
        message = 'Caution: Heat stress possible with prolonged exposure.';
        recommendationsList = [
            'Take breaks every hour',
            'Drink water every 15-20 minutes',
            'Work in shaded areas when possible',
            'Monitor workers for signs of heat stress'
        ];
    } else if (heatIndex < 39) {
        risk = 'high';
        message = 'Warning: High risk of heat stress!';
        recommendationsList = [
            'Limit outdoor work',
            'Take breaks every 30 minutes',
            'Drink water every 15 minutes',
            'Watch for signs of heat exhaustion',
            'Use cooling stations if available',
            'Avoid working alone'
        ];
    } else {
        risk = 'extreme';
        message = 'DANGER: Extreme risk of heat stress! Stop non-essential work.';
        recommendationsList = [
            'Suspend non-essential outdoor work',
            'Move work indoors if possible',
            'Implement buddy system',
            'Have emergency protocols ready',
            'Ensure medical services are available',
            'Consider rescheduling work activities'
        ];
    }

    warningBox.className = `warning-box ${risk}-risk`;
    warningMessage.textContent = message;
    recommendations.innerHTML = `
        <h4>Recommendations:</h4>
        <ul>${recommendationsList.map(rec => `<li>${rec}</li>`).join('')}</ul>
    `;
}