import { WeatherData } from "@/api/types";
import { Card, CardContent, CardHeader } from "./ui/card";
import { MapPin } from "lucide-react";

const WindCard = ({ data }: { data: WeatherData }) => {
  const getWindDirection = (degree: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index =
      Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8;
    return directions[index];
  };
  return (
    <Card className="w-full lg:w-[280px]">
      <CardHeader className="flex justify-between items-center">
        <p>Wind Status</p>
      </CardHeader>
      <CardContent>
        <div className="flex gap-1">
          <p className="text-6xl font-semibold">{data.wind.speed}</p>
          <div className="flex items-end">
            <p className="text-muted-foreground text-2xl">m/s</p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-5">
          <div className="flex items-center rounded-full border w-fit h-fit  px-[6px] py-[10px]">
            <MapPin className="h-4 rotate-45" />
          </div>
          <p className="text-2xl"> {getWindDirection(data.wind.deg)}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WindCard;
