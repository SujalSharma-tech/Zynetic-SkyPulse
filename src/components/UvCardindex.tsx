import { WeatherData } from "@/api/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { usePollutionData } from "@/hooks/use-weather";

const UVIndexCard = ({ data }: { data: WeatherData }) => {
  const pollution = usePollutionData({
    lat: data.coord.lat,
    lon: data.coord.lon,
  });
  console.log(data);
  console.log(pollution);
  const {
    pm2_5 = 0,
    so2 = 0,
    no2 = 0,
    o3 = 0,
  } = pollution?.data?.list?.[0]?.components || {};
  console.log(pm2_5, so2, no2, o3);

  function getAirQualityText(daqi: number | undefined) {
    switch (daqi) {
      case 1:
        return "Excellent";
      case 2:
        return "Good";
      case 3:
        return "Moderate";
      case 4:
        return "Poor";
      case 5:
        return "Very Poor";
      default:
        return "Extremely Poor";
    }
  }

  return (
    <Card className="w-full lg:w-[280px]">
      <CardHeader className="flex justify-between items-center">
        <p>DAQI</p>
        <div className="w-fit bg-green-500 rounded-xl px-[6px] py-[1px]">
          <p className="text-black font-semibold">
            {getAirQualityText(pollution.data?.list[0].main.aqi)}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center flex-col gap-3">
          <div className="flex justify-around w-full items-center text-center">
            <div>
              <p className="text-muted-foreground text-sm">PM 2.5</p>
              <p className="text-3xl font-semibold">{pm2_5}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">SO2</p>
              <p className="text-3xl font-semibold">{so2}</p>
            </div>
          </div>
          <div className="flex justify-around w-full items-center text-center">
            <div>
              <p className="text-muted-foreground text-sm">NO2</p>
              <p className="text-3xl font-semibold">{no2}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">O3</p>
              <p className="text-3xl font-semibold">{o3}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UVIndexCard;
