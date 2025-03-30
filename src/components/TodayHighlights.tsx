import { WeatherData } from "@/api/types";
import UVIndexCard from "./UvCardindex";
import WindCard from "./WindCard";
import SunriseAndSunsetCard from "./SunCard";
import HumidityCard from "./HumidityCard";
import VisiblityCard from "./VisibilityCard";
import TemperatureCard from "./TemperatureCard";

const TodayHighlights = ({ data }: { data: WeatherData }) => {
  return (
    <div className="mt-5">
      <h2 className="text-3xl font-bold p-5 pt-0">Todays Highlights</h2>
      <div className="flex gap-2 flex-wrap lg:flex-nowrap">
        <UVIndexCard data={data} />
        <WindCard data={data} />
        <SunriseAndSunsetCard data={data} />
      </div>
      <div className="flex gap-2 mt-3 flex-wrap lg:flex-nowrap">
        <HumidityCard data={data} />
        <VisiblityCard data={data} />
        <TemperatureCard data={data} />
      </div>
    </div>
  );
};

export default TodayHighlights;
