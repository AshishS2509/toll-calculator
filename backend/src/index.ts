import { Route, ApiResponse, SuccessResponse } from "./types";
import http from "http";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.TOLL_GURU_API_KEY || "Your API Key";
const PORT = process.env.PORT || 3000;
const API_URL = process.env.API_URL || "Toll Guru API URL";

const defaultData: Partial<Route> = {
  serviceProvider: "here",
  waypoints: [],
  vehicle: {
    type: "2AxlesAuto",
    weight: { value: 2313, unit: "pound" },
    height: { value: 1.5, unit: "meter" },
    length: { value: 4, unit: "meter" },
    axles: 2,
    emissionClass: "euro_5",
  },
};

http
  .createServer(async (req, res) => {
    if (req.method !== "POST" || req.url !== "/calculate") {
      res.writeHead(404, "Not Found", { "Content-Type": "application/json" });
      return res.end();
    }

    let body = "";

    req.on("data", (chunk: Buffer) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        const parsedData: Partial<Route> = JSON.parse(body);
        const requestData = { ...defaultData, ...parsedData };

        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
          },
          body: JSON.stringify(requestData),
        });

        if (!response.ok) {
          throw new Error(
            `API request failed: ${response.status} ${response.statusText}`
          );
        }

        const responseData = await response.json();

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(responseData));
      } catch (error: any) {
        console.error("Error:", error.message || error);

        res.writeHead(400, "Internal server error", {
          "Content-Type": "application/json",
        });
        res.end();
      }
    });

    req.on("error", (err) => {
      console.error("Request error:", err);
      res.writeHead(500, "Internal server error", {
        "Content-Type": "application/json",
      });
      res.end();
    });
  })
  .listen(PORT, () => console.log(`Server running on port ${PORT}`));
