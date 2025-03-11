import WeatherGeoSearch from "@/components/weather/geosearch";

export default async function WeatherPage() {
  return (
    <div>
      <WeatherGeoSearch />
      {/* <a href="https://www.weatherapi.com/" title="Free Weather API">
        <img
          src="//cdn.weatherapi.com/v4/images/weatherapi_logo.png"
          alt="Weather data by WeatherAPI.com"
        />
      </a> */}
    </div>
  );
}
