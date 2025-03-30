import { WeatherData } from "@/api/types";
import { Card, CardContent, CardHeader } from "./ui/card";
import { DropletIcon, Wind } from "lucide-react";

const HumidityCard = ({ data }: { data: WeatherData }) => {
  return (
    <Card className="w-full lg:w-[280px]">
      <CardHeader className="flex justify-between items-center">
        <p>Humidity and Pressure</p>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center flex-col gap-5">
          <div className="flex justify-between w-full items-center text-center">
            <div className="flex items-start">
              <DropletIcon className="h-12 w-12 text-muted-foreground" />
            </div>
            <div>
              <p className="text-2xl font-semibold">{data.main.humidity}%</p>
            </div>
          </div>
          <div className="flex justify-between w-full items-center text-center">
            <div>
              <Wind className="h-12 w-12 text-muted-foreground" />
            </div>
            <div>
              <p className=" text-2xl font-semibold">
                {data.main.pressure} hPa
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HumidityCard;
