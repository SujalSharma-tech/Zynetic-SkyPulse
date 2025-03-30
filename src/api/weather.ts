import { API_CONFIG } from "./config"
import { Coordinates, ForecastData, GeoData, PollutionData, WeatherData } from "./types";

class WeatherApi {

    private createUrl(endpoint: string, params: Record<string, string | number>){
        const searchParams = new URLSearchParams({
            appid : import.meta.env.VITE_API_KEY,
            ...params
        })

        return `${endpoint}?${searchParams.toString()}`
    }


    private async fetchData<T> (url : string) : Promise<T>{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error('Failed to fetch data')
        }
        return response.json()

    }


    async getCurrentWeather({lat,lon} : Coordinates) : Promise<WeatherData>{
        const url = this.createUrl(`${API_CONFIG.BASE_URL}/weather`,{
            lat : lat.toString(),
            lon : lon.toString(),
            units : API_CONFIG.DEFAULT_PARAMS.units
        })
        return this.fetchData<WeatherData>(url)
    }

    async reverseGeo({lat,lon} : Coordinates) : Promise<GeoData[]>{
        const url = this.createUrl(`${API_CONFIG.GEO_URL}/reverse`,{
            lat : lat.toString(),
            lon : lon.toString(),
            limit : 1
        })
        return this.fetchData<GeoData[]>(url)
    }

    async forecastWeather({lat,lon}:Coordinates): Promise<ForecastData>{
        const url = this.createUrl(`${API_CONFIG.BASE_URL}/forecast`,{
            lat : lat.toString(),
            lon : lon.toString(),
            units : API_CONFIG.DEFAULT_PARAMS.units

        })

        return this.fetchData<ForecastData>(url)
    }

    async getPollutionInfo({lat,lon} : Coordinates): Promise<PollutionData>{
        const url = this.createUrl(`${API_CONFIG.BASE_URL}/air_pollution`,{
            lat : lat.toString(),
            lon : lon.toString(),
        })

        return this.fetchData<PollutionData>(url)
    }

    async searchLocations(query: string): Promise<GeoData[]> {
    const url = this.createUrl(`${API_CONFIG.GEO_URL}/direct`, {
      q: query,
      limit: "5",
    });
    return this.fetchData<GeoData[]>(url);
  }
}

export const weatherAPI = new WeatherApi();