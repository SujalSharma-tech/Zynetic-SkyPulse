import { useParams, useSearchParams } from "react-router-dom";
import {
  useWeatherQuery,
  useForecastQuery,
  useReverseGeocodeQuery,
} from "@/hooks/use-weather";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import WeatherSkeleton from "../components/loading-skeleton";
import { FavoriteButton } from "@/components/FavoriteButton";
import CurrentWeather from "@/components/CurrentWeather";
import ForecastWeather from "@/components/ForecastWeather";
import TodayHighlights from "@/components/TodayHighlights";

export default function CityPage() {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const lat = parseFloat(searchParams.get("lat") || "0");
  const lon = parseFloat(searchParams.get("lon") || "0");

  const coordinates = { lat, lon };

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  const locationQuery = useReverseGeocodeQuery(coordinates);

  const locationName = locationQuery.data?.[0]?.name;

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Failed to load weather data. Please try again.
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data || !params.cityName) {
    return <WeatherSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          {params.cityName}, {weatherQuery.data.sys.country}
        </h1>
        <div className="flex gap-2">
          <FavoriteButton
            data={{ ...weatherQuery.data, name: params.cityName }}
          />
        </div>
      </div>

      <div className="flex gap-5 flex-col md:flex-row justify-center">
        <div className="w-full md:w-[30%] min-w-fit">
          <CurrentWeather
            data={weatherQuery.data}
            forecastData={forecastQuery.data}
            location={locationName}
          />
        </div>
        <div className="w-full md:w-[70%]">
          <TodayHighlights data={weatherQuery.data} />
          <ForecastWeather data={forecastQuery.data} />
        </div>
      </div>
    </div>
  );
}
