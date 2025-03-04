import { ApiResponse, RequestType, Route } from "./types";
import http from "http";
import dotenv from "dotenv";
import vehicleTypes from "./carTypes";

dotenv.config();

const API_KEY = process.env.TOLL_GURU_API_KEY || "Your API Key";
const PORT = process.env.PORT || 3000;
const API_URL = process.env.API_URL || "Toll Guru API URL";

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://toll-calculator-ten-beta.vercel.app",
];

http
  .createServer(async (req, res) => {
    const { origin } = req.headers;
    const { method, url } = req;

    if (!origin) {
      return res
        .writeHead(400, "Origin not found", {
          "Content-Type": "application/json",
        })
        .end();
    } else if (allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-api-key");

      // Handle preflight OPTIONS request
      if (method === "OPTIONS") {
        return res.writeHead(204).end();
      }
    } else {
      return res
        .writeHead(403, "CORS policy violation", {
          "Content-Type": "application/json",
        })
        .end();
    }

    // Only handle POST /calculate
    if (method !== "POST" || url !== "/calculate") {
      return res
        .writeHead(404, "Not Found", { "Content-Type": "application/json" })
        .end();
    }

    let body = "";

    req.on("data", (chunk: Buffer) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        const parsedData: RequestType = JSON.parse(body);

        const requestData: Route = {
          from: parsedData.from,
          to: parsedData.to,
          waypoints: parsedData.waypoints,
          vehicle: vehicleTypes[parsedData.vehicle],
          serviceProvider: "here",
        };

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

        const responseData: ApiResponse = await response.json();
        if (responseData.meta) delete responseData.meta;
        res.writeHead(200, "OK", { "Content-Type": "application/json" });
        res.end(JSON.stringify(responseData));
      } catch (error: any) {
        console.error("Error:", error.message || error);
        res
          .writeHead(500, error.message || error, {
            "Content-Type": "application/json",
          })
          .end();
      }
    });

    req.on("error", (err) => {
      console.error("Request error:", err);
      res
        .writeHead(500, err.message, { "Content-Type": "application/json" })
        .end();
    });
  })
  .listen(PORT, () => console.log(`Server running on port ${PORT}`));
