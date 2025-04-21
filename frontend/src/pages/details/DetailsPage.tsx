import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import { useLoader } from "../../hooks/useLoader";
import { useTollData } from "../../hooks/useTollData";
import { Routes } from "../../types/data.types";
import { useEffect, useState } from "react";

const DetailsPage = () => {
  const { loading } = useLoader();
  const { data } = useTollData();
  const [currentRoute, setCurrentRoute] = useState<Routes | null>(null);

  useEffect(() => {
    if (data) {
      setCurrentRoute(data.routes[0]);
    }
  }, [data]);

  return (
    <Box style={{ maxHeight: 400, display: "grid", placeItems: "center" }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <span>
          Routes:{" "}
          {data?.routes?.map((route: Routes) => {
            return (
              <Chip
                key={route.summary.name}
                label={route.summary.name}
                onClick={() => setCurrentRoute(route)}
              />
            );
          })}
        </span>
      )}
      {currentRoute && (
        <Card
          style={{ width: "100%", border: "1px solid #ccc", marginTop: "8px" }}
        >
          <CardHeader
            title={`${currentRoute?.tolls.length} Tolls on the way.`}
          />
          <Divider />
          <CardContent>
            {currentRoute?.tolls?.map((toll) => {
              return (
                <Container
                  key={toll.id}
                  style={{
                    paddingTop: "4px",
                    paddingBottom: "4px",
                    marginTop: "8px",
                    marginBottom: "8px",
                    backgroundColor: "#3e3e3e",
                    borderRadius: "4px",
                  }}
                >
                  <Typography variant="body1">
                    {toll.name ?? toll.start?.name}
                  </Typography>
                  <Typography variant="body2">
                    Cash: {toll.cashCost} {toll.currency} | Tag: {toll.tagCost}{" "}
                    {toll.currency}
                  </Typography>
                </Container>
              );
            })}
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default DetailsPage;
