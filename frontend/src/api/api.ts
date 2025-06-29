import { MAPTILER_API_KEY } from "../config";
import {
  IGeocodingResponse,
  IPostData,
  IResponseData,
} from "../types/data.types";

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

export const fetchData = async (data: IPostData) => {
  try {
    const response = await fetch("https://toll-api.onrender.com/calculate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("API request failed");

    return (await response?.json()) as IResponseData;
  } catch (e) {
    console.error("Fetch Error:", e);
    return null;
  }
};

export const wakeupCall = () => fetch("https://toll-api.onrender.com/wakeup");
