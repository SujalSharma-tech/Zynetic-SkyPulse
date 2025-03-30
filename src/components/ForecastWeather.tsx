import { ForecastData } from "@/api/types";
import { format } from "date-fns";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

interface dailyForecast {
  date: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  wind: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
}

const ForecastWeather = ({ data }: { data: ForecastData }) => {
  const formatTemp = (temp: number) => {
    return `${Math.round(temp)}`;
  };

  const dailyData = data.list.reduce((acc, forecast) => {
    const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");
    const hour = new Date(forecast.dt * 1000).getHours();
    if (
      !acc[date] ||
      Math.abs(hour - 12) <
        Math.abs(new Date(acc[date].date * 1000).getHours() - 12)
    ) {
      acc[date] = {
        temp_min: forecast.main.temp_min,
        temp_max: forecast.main.temp_max,
        humidity: forecast.main.humidity,
        wind: forecast.wind.speed,
        weather: forecast.weather[0],
        date: forecast.dt,
      };
    } else {
      acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
      acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max);
    }
    return acc;
  }, {} as Record<string, dailyForecast>);

  const nextDays = Object.values(dailyData).splice(1, 6);

  return (
    <div className="">
      <h2 className="text-3xl font-bold p-5 pt-0">5 Days Forecast</h2>
      <div className="flex gap-1  md:gap-3 flex-wrap ">
        {nextDays.map((weekday, indx) => {
          return (
            <Card
              className="flex flex-col items-center w-[100px] py-1 h-fit"
              key={indx}
            >
              <CardHeader>
                {format(new Date(weekday.date * 1000), "EEE")}
              </CardHeader>
              <CardContent>
                <div>
                  <img
                    src={`https://openweathermap.org/img/wn/${weekday.weather.icon}@4x.png`}
                    className="h-20 object-cover"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex gap-2 items-center">
                  <p className="text-2xl">{formatTemp(weekday.temp_max)}</p>
                  <p className="text-muted-foreground">
                    {formatTemp(weekday.temp_min)}
                  </p>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastWeather;
