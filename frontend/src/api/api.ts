import { MAPTILER_API_KEY } from "../config";
import { IGeocodingResponse } from "../types/data.types";

const API_KEY = MAPTILER_API_KEY;

export const fetchLocation = async (query: string) => {
  const response = await fetch(
    `https://api.maptiler.com/geocoding/${encodeURIComponent(
      query
    )}.json?key=${API_KEY}`
  );
  const data: IGeocodingResponse = await response.json();
  return data.features;
};

// export const wakeupCall = async () => await fetch("/wakeup");
