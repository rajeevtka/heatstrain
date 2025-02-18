# Worker Heat Stress Monitor

A Progressive Web Application (PWA) designed to monitor and assess worker heat stress conditions in real-time. This tool helps ensure workplace safety by providing instant feedback about heat stress risks based on current weather conditions.

## Features

- Real-time weather data fetching
- Heat stress risk assessment
- Dynamic safety recommendations
- PWA support for offline functionality
- Mobile-responsive design

## Setup

1. Clone the repository:
```bash
git clone [your-repository-url]
cd worker-heat-stress-monitor
```

2. Install dependencies:
```bash
npm install
```

3. Set up your OpenWeather API key:
- Sign up at [OpenWeather](https://openweathermap.org/api)
- Create a `.env` file in the root directory
- Add your API key:
  ```
  WEATHER_API_KEY=your_api_key_here
  ```

4. Start the development server:
```bash
npm start
```

## Building for Production

```bash
npm run build
```

## Mobile Development

To build for Android:
```bash
npm run add-android
npm run open-android
```

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Capacitor.js
- OpenWeather API
- Service Workers for PWA support

## License

ISC License
