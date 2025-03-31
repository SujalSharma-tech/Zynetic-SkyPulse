import { ForecastData, WeatherData } from "@/api/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Calendar, MapPinIcon } from "lucide-react";
import { format } from "date-fns";
const CurrentWeather = ({
  data,
  forecastData,
  location,
}: {
  data: WeatherData;
  forecastData: ForecastData;
  location: string | undefined;
}) => {
  const formatTemp = (temp: number) => {
    return `${Math.round(temp)}°c`;
  };

  const hourlyData = forecastData.list.slice(0, 8);

  function formatDate(date: Date) {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "short",
    });
  }
  return (
    <div className="current-weather flex flex-col gap-5">
      <Card className=" flex w-full lg:min-w-fit">
        <CardHeader>
          <CardTitle className="text-muted-foreground">Now</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center ">
            <h1 className="text-4xl sm:text-6xl font-bold">
              {formatTemp(data.main.temp)}
            </h1>
            <img
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
              alt="weatherinfo"
              className="h-40 sm:h-44"
            />
          </div>
          <p className="text-muted-foreground">{data.weather[0].description}</p>
          <div className="flex items-start gap-3 mt-5 flex-col">
            <div className="flex gap-2">
              {" "}
              <Calendar className="h-6" />
              <p className="text-muted-foreground">
                {formatDate(new Date())}
              </p>{" "}
            </div>
            <div className="flex gap-2">
              {" "}
              <MapPinIcon className="h-6" />
              <p className="text-muted-foreground">
                {location},{data.sys.country}
              </p>{" "}
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full lg:min-w-fit">
        <CardHeader>
          <CardTitle className="text-muted-foreground">
            Hourly Forecast
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            {hourlyData.map((current, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-between w-full items-center flex-row"
                >
                  <div className="flex gap-1 items-center">
                    <img
                      src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png`}
                      alt="weatherinfo"
                      className="h-8 sm:h-12"
                    />
                    <p>{formatTemp(current.main.temp)}</p>
                  </div>
                  <div>{format(new Date(current.dt_txt), "dd MMM")}</div>
                  <div>{format(new Date(current.dt_txt), "h a")}</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CurrentWeather;
