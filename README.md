# Toll Calculator Web Application

## Overview

This is a Toll Calculator Web Application built using React and Bootstrap, leveraging Map My India API and Toll Guru API. The application allows users to input their origin and destination, with an optional waypoint, and provides information on total toll fare, petrol prices along the route, and a visual representation of the route on the map.

## Features

- **Input Form:** Users can easily enter their origin, destination, and an optional waypoint for a customized route.

- **Total Toll Fare:** The application calculates and displays the total toll fare for the entered route using the Toll Guru API.

- **Petrol Prices:** Users can view the estimated petrol prices for the entire route, helping them plan their fuel expenses.

- **Interactive Map:** The route is visually represented on an interactive map powered by Map My India API, providing users with a clear understanding of the journey.

## Technologies Used

- **React:** The application is built using React, a popular JavaScript library for building user interfaces.

- **Bootstrap:** Bootstrap is used for responsive and clean UI design, ensuring a seamless user experience.

- **Map My India API:** Integration with Map My India API allows for accurate and dynamic mapping of the route.

- **Toll Guru API:** Toll Guru API is utilized to fetch real-time toll information and calculate the total toll fare for the specified route.

## How to Use

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Ashishk2509/toll-calculator.git

2. **Install Dependencies:**
    ```bash
    cd toll-calculator
    cd frontend
    npm install

3. **Configure APIs:**
    ```bash
    # Map My India API Key
    REACT_APP_MAP_MY_INDIA = <your_map_my_india_api_key>
    # Toll Guru API Key
    REACT_APP_TOLL_GURU = <your_toll_guru_api_key>

4. **Run the Application:**
    ```bash
    cd ./frontend
    npm start

    cd ./backend
    npm index.js

5. **Access the Application:**
    Open your web browser and navigate to http://localhost:3000.


## Contribution
Contributions are welcome! If you have suggestions or find issues, please open an issue or submit a pull request.
