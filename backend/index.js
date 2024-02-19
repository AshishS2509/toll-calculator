import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'
import * as dotnet from 'dotenv';
dotnet.config();
const app = express();
const port = 3001;
const key = process.env.TOLL_GURU_API_KEY;

app.use(cors());
app.use(bodyParser.json());

app.post('/getData', async (req, res) => {
    const data = {
        from: req.body.from,
        to: req.body.to,
        waypoints: req.body.waypoints.address? [req.body.waypoints]: [],
        serviceProvider: 'here',
        vehicle: {
          type: '2AxlesAuto',
          weight: { value: 20000, unit: 'pound' },
          height: { value: 7.5, unit: 'meter' },
          length: { value: 7.5, unit: 'meter' },
          axles: 4,
          emissionClass: 'euro_5',
        },
      };

      try {
        const response = await fetch('https://apis.tollguru.com/toll/v2/origin-destination-waypoints', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': key,
          },
          body: JSON.stringify(data),
        });
    
        const responseData = await response.json();
        res.send(responseData);
      } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ error: 'Internal Server Error' });
      }
    });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })