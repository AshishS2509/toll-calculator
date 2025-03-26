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
  const response = await fetch("https://toll-api.onrender.com/calculate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return (await response.json()) as IResponseData;
};

export const wakeupCall = () => fetch("https://toll-api.onrender.com/wakeup");
