# SkyPulse - Documentation

## Table of Contents

1. [Introduction](#introduction)
2. [Project Architecture](#project-architecture)
3. [Getting Started](#getting-started)
4. [API Integration](#api-integration)
5. [Core Features](#core-features)
6. [Component Structure](#component-structure)
7. [State Management](#state-management)
8. [Hooks](#hooks)
9. [UI Components](#ui-components)
10. [Routing](#routing)
11. [Theming](#theming)
12. [Data Caching](#data-caching)
13. [Optimization Strategies](#optimization-strategies)
14. [Known Issues](#known-issues)
15. [Future Enhancements](#future-enhancements)

## Introduction

SkyPulse is a modern weather application built with React, TypeScript, and Vite. The application provides real-time weather information, forecasts, and additional meteorological data like air quality, wind conditions, and UV index. The app emphasizes user experience with features like location-based weather, favorites, search history, and theme customization.

## Project Architecture

### Technology Stack
- **Frontend Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 4
- **UI Component Library**: Shadcn UI (customized)
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router DOM 7
- **Notifications**: Sonner
- **Date Handling**: date-fns

### Directory Structure
```
SkyPulse/client/
├── public/                # Static assets
├── src/
│   ├── api/               # API integration
│   │   ├── config.ts      # API configuration
│   │   ├── types.ts       # API response types
│   │   └── weather.ts     # API service
│   ├── components/        # UI components
│   │   ├── ui/            # Shadcn UI components
│   │   └── ...            # Application components
│   ├── context/           # React context providers
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── pages/             # Page components
│   ├── App.tsx            # Root application component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
├── .env                   # Environment variables
├── vite.config.ts         # Vite configuration
└── tsconfig.json          # TypeScript configuration
```

## Getting Started

### Prerequisites
- Node.js (latest LTS version recommended)
- npm or yarn

### Installation
1. Clone the repository
2. Navigate to the client directory
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file with your OpenWeatherMap API key:
   ```
   VITE_API_KEY=your_api_key_here
   ```

### Development
Start the development server:
```bash
npm run dev
```

This will launch the application at `http://localhost:5173` with hot module reloading enabled.

### Production Build
Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## API Integration

### OpenWeatherMap API
The application uses the OpenWeatherMap API to fetch weather data. The API integration is managed through a class-based service in `src/api/weather.ts`.

### API Configuration
```typescript
// src/api/config.ts
export const API_CONFIG = {
    BASE_URL: "https://pro.openweathermap.org/data/2.5",
    GEO_URL: "https://pro.openweathermap.org/geo/1.0",
    API_KEY: import.meta.env.VITE_API_KEY,
    DEFAULT_PARAMS: {
        appid: import.meta.env.VITE_API_KEY,
        units: "metric"
    }
}
```

### API Service
The `WeatherApi` class in `src/api/weather.ts` provides methods to fetch different types of weather data:
- `getCurrentWeather`: Fetches current weather data
- `reverseGeo`: Converts coordinates to location names
- `forecastWeather`: Fetches 5-day weather forecast
- `getPollutionInfo`: Fetches air pollution data
- `searchLocations`: Searches for locations by name

### Data Types
The application uses TypeScript interfaces to define the structure of API responses in `src/api/types.ts`:
- `Coordinates`: Latitude and longitude
- `WeatherData`: Current weather information
- `GeoData`: Geographic location information
- `ForecastData`: 5-day weather forecast
- `PollutionData`: Air quality information

## Core Features

### 1. Location-Based Weather
- Uses browser geolocation API to get the user's current location
- Displays weather data for the current location on the dashboard

### 2. Weather Search
- Search for weather information by city name
- Displays search suggestions as you type

### 3. Favorites
- Save favorite locations for quick access
- View favorite locations in a scrollable list on the dashboard
- Add or remove locations from favorites

### 4. Search History
- Track recently searched locations
- Quick access to previously searched locations

### 5. Weather Details
- Current temperature and conditions
- Hourly forecast
- 5-day forecast
- Today's highlights including:
  - Air quality (DAQI)
  - Wind speed and direction
  - Sunrise and sunset times
  - Humidity and pressure
  - Visibility
  - Temperature range

### 6. Theme Customization
- Toggle between light and dark themes
- Automatically adapts to system preference

## Component Structure

### Pages
1. **WeatherDashboard** (`src/pages/WeatherDashboard.tsx`)
   - Main landing page displaying weather for the user's current location
   - Shows favorite cities, current weather, forecast, and highlights

2. **CityPage** (`src/pages/CityPage.tsx`)
   - Displays detailed weather information for a specific city
   - Accessed via search or favorites

### Key Components

1. **CurrentWeather** (`src/components/CurrentWeather.tsx`)
   - Displays current temperature, weather conditions, and hourly forecast
   - Shows date and location information

2. **ForecastWeather** (`src/components/ForecastWeather.tsx`)
   - Displays 5-day weather forecast with temperature ranges and conditions

3. **TodayHighlights** (`src/components/TodayHighlights.tsx`)
   - Container component for various weather metrics:
     - UVCardIndex: Air quality information
     - WindCard: Wind speed and direction
     - SunCard: Sunrise and sunset times
     - HumidityCard: Humidity and pressure
     - VisibilityCard: Visibility distance
     - TemperatureCard: Temperature ranges

4. **FavoriteCities** (`src/components/FavoriteCities.tsx`)
   - Displays a scrollable list of favorite cities
   - Shows quick weather information for each city

5. **FavoriteButton** (`src/components/FavoriteButton.tsx`)
   - Toggle button to add/remove cities from favorites

6. **SearchBox** (`src/components/SearchBox.tsx`)
   - City search functionality with autocomplete
   - Shows search history and favorites in dropdown

7. **Header** (`src/components/header.tsx`)
   - Application header with logo, search, and theme toggle

## State Management

### React Query
The application uses TanStack Query (React Query) for server state management:
- Query keys are defined using a consistent pattern in `src/hooks/use-weather.ts`
- Each query has appropriate caching and refetch settings

### Local Storage
Two types of data are persisted in local storage:
1. Favorite cities
2. Search history

### Context API
The application uses React's Context API for theme management:
- `ThemeProvider` in `src/context/theme-provider.tsx` manages theme state

## Hooks

### Weather Data Hooks
- `useWeatherQuery`: Fetches current weather data
- `useForecastQuery`: Fetches forecast data
- `useReverseGeocodeQuery`: Converts coordinates to location names
- `usePollutionData`: Fetches air pollution data
- `useLocationSearch`: Searches for locations by name

### State Management Hooks
- `useFavorites`: Manages favorite cities
- `useHistory`: Manages search history
- `useGeolocationData`: Manages browser geolocation
- `useLocalStorage`: Generic hook for localStorage interaction
- `useTheme`: Manages theme state

## UI Components

The application uses a customized version of Shadcn UI, a collection of accessible and customizable components built on top of Radix UI and Tailwind CSS.

### Key UI Components
- **Alert**: Error notifications and warnings
- **Button**: Various button styles
- **Card**: Container for weather information
- **Command**: Search interface and dropdown
- **Dialog**: Modal dialogs
- **Scroll Area**: Scrollable containers
- **Skeleton**: Loading placeholders
- **Tooltip**: Additional information on hover

## Routing

The application uses React Router DOM for navigation with two main routes:
1. `/`: WeatherDashboard (home page)
2. `/city/:cityName`: CityPage (detailed city view)

## Theming

The application supports both light and dark themes:
- Theme preference is stored in local storage
- Default theme is dark
- Theme can be toggled via the header button
- System preference detection is supported

CSS variables in `src/index.css` define theme colors and are switched based on theme selection.

## Data Caching

React Query handles caching of API responses with the following settings:
- `staleTime`: 5 minutes
- `gcTime`: 10 minutes
- `refetchOnWindowFocus`: Disabled
- `retry`: Disabled

This means data will be considered fresh for 5 minutes, cached for 10 minutes after last use, and won't automatically refetch when the window regains focus.

## Optimization Strategies

1. **Code Splitting**: The application is set up for automatic code splitting via React Router
2. **Memoization**: React Query caches API responses to reduce redundant network requests
3. **Local Storage**: Frequently accessed data is stored locally
4. **Skeleton Loading**: Skeleton placeholders improve perceived performance during loading
5. **Responsive Design**: The application is fully responsive using Tailwind CSS
6. **Conditional Rendering**: Components only render when necessary data is available

## Known Issues

1. **API Limitation**: The free tier of OpenWeatherMap API has rate limits
2. **Geolocation Permissions**: Users must grant location permissions for full functionality
3. **Reverse Geocoding Query**: The `useReverseGeocodeQuery` hook occasionally returns undefined due to timing issues

## Future Enhancements

1. **Weather Maps**: Integrate interactive weather maps
2. **Historical Data**: Add historical weather data visualization
3. **Weather Alerts**: Implement severe weather alerts and notifications
4. **Offline Support**: Add service workers for offline functionality
5. **User Accounts**: Allow users to sync favorites across devices
6. **Unit Conversion**: Toggle between metric and imperial units
7. **Weather Widgets**: Exportable widgets for embedding in other applications
8. **PWA Support**: Convert to Progressive Web App for installation on devices
9. **Advanced Search**: Filter search by country, state, or region
10. **Weather Comparison**: Compare weather between multiple locations
