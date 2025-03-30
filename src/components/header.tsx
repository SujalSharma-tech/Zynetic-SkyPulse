import { Link } from "react-router-dom";
import logo from "../../public/skypulse-text-logo.svg";
import { useTheme } from "@/context/theme-provider";
import { Moon, Sun } from "lucide-react";
import { CitySearch } from "./SearchBox";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <header className="sticky top-0 w-full z-50 border-b bg-background/95 backdrop-blur py-2 supports-[bacldrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 ">
        <Link to={"/"}>
          <img src={logo} alt="logo" className="h-14" />
        </Link>

        <CitySearch />
        <div className="flex gap-1 ml-1">
          <div
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`flex transition-transform duration-500 items-center cursor-pointer ${
              isDark ? "rotate-180" : "rotate-0"
            }`}
          >
            {isDark ? (
              <Sun className="h-6 w-6 text-yellow-500 rotate-0 transition-all" />
            ) : (
              <Moon className="h-6 w-6 text-blue-500 rotate-0 transition-all" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
