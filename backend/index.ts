import express, { json, NextFunction, Request, Response } from "express"
import { Route, Response as ApiResponse } from "./types";
import dotenv from "dotenv"
const app = express();
app.use(json())

dotenv.config()
const key = process.env.TOLL_GURU_API_KEY ?? "";

const defaultData: Partial<Route> = {
    serviceProvider: "here",
    waypoints: [],
    vehicle: {
        type: '2AxlesAuto',
        weight: { value: 2313, unit: 'pound' },
        height: { value: 1.5, unit: 'meter' },
        length: { value: 4, unit: 'meter' },
        axles: 2,
        emissionClass: 'euro_5',
    },
}

const manualValidation = (req: Request<unknown, unknown, Route>, res: Response, next: NextFunction) => {
    const originAddress = req?.body?.from?.address;
    const destinationAddress = req?.body?.to?.address;


    const validateArr = [originAddress, destinationAddress]

    const isError = validateArr.some(val => typeof val === "string" ? !val.length : !val)

    if (isError) {
        res?.status(400)
        res.send({ error: true, message: "Parameter Validation error" })
        return;
    }
    next()
}


app.post("/calculate", manualValidation, async (req: Request<unknown, unknown, Route>, res: Response) => {

    try {
        const data: Route = {
            ...defaultData,
            ...req.body
        }

        const response = await fetch('https://apis.tollguru.com/toll/v2/origin-destination-waypoints', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': key,
            },
            body: JSON.stringify(data),
        });
        const responseData: ApiResponse = await response.json();
        delete responseData.meta
        res.send(responseData);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
})

app.listen(3001, () => console.log("Listening on port 3000"))