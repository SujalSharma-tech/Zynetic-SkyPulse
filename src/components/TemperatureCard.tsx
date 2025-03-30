import { WeatherData } from "@/api/types";
import { Card, CardContent, CardHeader } from "./ui/card";

const TemperatureCard = ({ data }: { data: WeatherData }) => {
  return (
    <Card className="w-full lg:w-[280px]">
      <CardHeader className="flex justify-between items-center">
        <p>Temperature</p>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground text-sm font-semibold">
            Max Temp
          </p>
          <div className="flex items-end">
            <p className=" text-2xl">{data.main.temp_max}°c</p>
          </div>
        </div>
        <div className="flex gap-1 justify-between items-center">
          <p className="text-muted-foreground text-sm font-semibold">
            Min Temp
          </p>
          <div className="flex items-end">
            <p className=" text-2xl">{data.main.temp_min}°c</p>
          </div>
        </div>
        <div className="flex gap-1 justify-between items-center">
          <p className="text-muted-foreground text-sm font-semibold">
            Feels Like
          </p>
          <div className="flex items-end">
            <p className=" text-2xl">{data.main.feels_like}°c</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TemperatureCard;
