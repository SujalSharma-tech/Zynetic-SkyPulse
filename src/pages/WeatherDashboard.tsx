import CurrentWeather from "@/components/CurrentWeather";
import { FavoriteCities } from "@/components/FavoriteCities";
import ForecastWeather from "@/components/ForecastWeather";
import WeatherSkeleton from "@/components/loading-skeleton";
import TodayHighlights from "@/components/TodayHighlights";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useGeolocationData } from "@/hooks/use-geolocation";
import {
  useForecastQuery,
  useReverseGeocodeQuery,
  useWeatherQuery,
} from "@/hooks/use-weather";
import { AlertCircle, MapPin, RefreshCw } from "lucide-react";

const WeatherDashboard = () => {
  const {
    coords,
    error: locationError,
    getLocation,
    isloading: locationLoading,
  } = useGeolocationData();
  //   const defaultcoords = { lat: 28.6139, lon: 77.2088 };

  const locationQuery = useReverseGeocodeQuery(coords);
  const weatherQuery = useWeatherQuery(coords);
  const forecastQuery = useForecastQuery(coords);

  const handleRefresh = () => {
    getLocation();
    if (coords) {
      locationQuery.refetch();
      weatherQuery.refetch();
      forecastQuery.refetch();
    }
  };

  if (locationLoading) return <WeatherSkeleton />;

  if (locationError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {locationError} or Search Your location
          <Button variant={"outline"} className="w-fit" onClick={getLocation}>
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!coords) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          <p>
            Please enable location to see your local weather or Search your
            location
          </p>
          <Button variant={"outline"} className="w-fit" onClick={getLocation}>
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  const locationName = locationQuery.data?.[0]?.name;

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>
          Error fetching weather information. please try again
        </AlertTitle>
        <AlertDescription>
          {locationError}
          <Button variant={"outline"} className="w-fit" onClick={handleRefresh}>
            <RefreshCw className="mr-2 h-4 w-4" />
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data) {
    return <WeatherSkeleton />;
  }
  return (
    <div>
      <FavoriteCities />

      <div className="flex justify-between py-4 px-2 items-center">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={handleRefresh}
          disabled={weatherQuery.isFetching || forecastQuery.isFetching}
        >
          <RefreshCw
            className={`h-4 w-4 ${
              weatherQuery.isFetching ? "animate-spin" : ""
            }`}
          />
        </Button>
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
};

export default WeatherDashboard;
