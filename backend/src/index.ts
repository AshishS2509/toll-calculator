import { ApiResponse, RequestType, Route } from "./types";
import http from "http";
import vehicleTypes from "./utils/carTypes";

const API_KEY = process.env.TOLL_GURU_API_KEY || "Your API Key";
const PORT = process.env.PORT || 3003;
const API_URL = process.env.API_URL || "Toll Guru API URL";
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split(",") || [];

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
    } else if (ALLOWED_ORIGINS.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS, GET");
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

    // Wakeup call for handle server sleep.
    if (method === "GET" && url === "/wakeup") {
      return res
        .writeHead(200, "OK", {
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
        const { from, to, waypoints, vehicle }: RequestType = JSON.parse(body);

        const requestData: Route = {
          from,
          to,
          waypoints,
          vehicle: vehicleTypes[vehicle],
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
