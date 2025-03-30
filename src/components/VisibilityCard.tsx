import { WeatherData } from "@/api/types";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Eye } from "lucide-react";

const VisiblityCard = ({ data }: { data: WeatherData }) => {
  return (
    <Card className="w-full lg:w-[280px]">
      <CardHeader className="flex justify-between items-center">
        <p>Visibility</p>
      </CardHeader>
      <CardContent>
        <div className="flex gap-1">
          <p className="text-6xl font-semibold">{data.visibility / 1000}</p>
          <div className="flex items-end">
            <p className="text-muted-foreground text-2xl">Km</p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-5">
          <div className="flex items-center rounded-full border w-fit h-fit  px-[6px] py-[10px]">
            <Eye className="h-4" />
          </div>
          <p className="text-2xl"> Average</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VisiblityCard;
