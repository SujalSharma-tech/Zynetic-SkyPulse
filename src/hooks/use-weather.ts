import { Coordinates } from "@/api/types";
import { weatherAPI } from "@/api/weather";
import { useQuery } from "@tanstack/react-query";

export const WEATHER_KEYS ={
    weather : (coords : Coordinates) => ["weather",coords] as const,
    forecast : (coords : Coordinates) => ["forecast",coords] as const,
    pollution : (coords : Coordinates) => ["pollution",coords] as const,
    location : (coords : Coordinates) => ["location",coords] as const,
    search : (query : string) => ["search",query] as const
} as const

export function useWeatherQuery(coordinates : Coordinates | null){

   return useQuery({
        queryKey:
        WEATHER_KEYS.weather(coordinates??{lat : 28.6139, lon : 77.2088}),
        queryFn: () => (coordinates? weatherAPI.getCurrentWeather(coordinates) : null),
        enabled : !!coordinates,
    })
}

export function useForecastQuery(coordinates : Coordinates | null){

    return useQuery({
        queryKey:
        WEATHER_KEYS.forecast(coordinates??{lat : 28.6139, lon : 77.2088}),
        queryFn: () => (coordinates? weatherAPI.forecastWeather(coordinates) : null),
        enabled : !!coordinates,
    })
}

export function useReverseGeocodeQuery(coordinates : Coordinates | null){

    return useQuery({
        queryKey:
        WEATHER_KEYS.location(coordinates??{lat : 28.6139, lon : 77.2088}),
        queryFn: () => (coordinates? weatherAPI.reverseGeo(coordinates) : null),
        enabled : !!coordinates,
    })
}
export function usePollutionData(coordinates : Coordinates | null ){

    return useQuery({
        queryKey:
        WEATHER_KEYS.pollution(coordinates??{lat : 28.6139, lon : 77.2088}),
        queryFn: () => (coordinates? weatherAPI.getPollutionInfo(coordinates) : null),
        enabled : !!coordinates,
    })
}

export function useLocationSearch(query: string) {
  return useQuery({
    queryKey: WEATHER_KEYS.search(query),
    queryFn: () => weatherAPI.searchLocations(query),
    enabled: query.length >= 3,
  });
}