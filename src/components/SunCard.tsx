import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { WeatherData } from "@/api/types";

const SunriseIcon = () => (
  <div className="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 10L12 2M12 2L7 7M12 2L17 7" />
    </svg>
  </div>
);

const SunsetIcon = () => (
  <div className="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 14L12 22M12 22L7 17M12 22L17 17" />
    </svg>
  </div>
);

// Function to convert Unix timestamp to hours and minutes
const unixToHoursMinutes = (unixTime: number) => {
  // Create a date object from unix timestamp (ms)
  const date = new Date(unixTime * 1000);

  // Extract hours and minutes
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Format with AM/PM
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedHours}:${formattedMinutes} ${ampm}`;
};

const SunriseAndSunsetCard = ({ data }: { data: WeatherData }) => {
  // Convert Unix timestamps to formatted times
  const sunriseTime = unixToHoursMinutes(data.sys.sunrise);
  const sunsetTime = unixToHoursMinutes(data.sys.sunset);

  return (
    <Card className="w-full lg:w-[280px] shadow-md">
      <CardHeader className="flex justify-between items-center">
        <p>Sunrise and Sunset</p>
      </CardHeader>
      <CardContent className="space-y-8 pt-2">
        <div className="flex items-center gap-6">
          <SunriseIcon />
          <div>
            <div className="text-2xl text-gray-600">{sunriseTime}</div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <SunsetIcon />
          <div>
            <div className="text-2xl text-gray-600">{sunsetTime}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SunriseAndSunsetCard;
