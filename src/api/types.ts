export interface Coordinates {
  lat: number;
  lon: number;
}

interface WeatherConditions {
  id: number;
  main: string;
  description: string;
  icon: string;
}
export interface WeatherData {
  coord: Coordinates;
  weather: WeatherConditions[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    sunrise: number;
    sunset: number;
    country: string;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface GeoData {
  name: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

interface ForecastList {
  dt: number;
  main: WeatherData["main"];
  weather: WeatherData["weather"];
  wind: WeatherData["wind"];
  clouds: WeatherData["clouds"];
  sys: {
    pod: string;
  };
  pop: number;
  visibility: number;
  dt_txt: string;
}
export interface ForecastData {
  code: string;
  message: number;
  cnt: number;
  list: ForecastList[];
  city: {
    id: number;
    name: string;
    coord: WeatherData["coord"];
    country: GeoData["country"];
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

interface PollutionDataList {
  main: {
    aqi: number;
  };
  components: {
    co: number;
    no: number;
    o3: number;
    so2: number;
    no2 : number
    pm2_5: number;
    pm10: number;
    nh3: number;
  };
  dt: number
}

export interface PollutionData {
  coords: Coordinates;
  list: PollutionDataList[]
}
