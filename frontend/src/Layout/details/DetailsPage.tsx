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
  Stack,
} from "@mui/material";
import { useLoader } from "../../hooks/useLoader";
import { useTollData } from "../../hooks/useTollData";
import { Routes } from "../../types/data.types";
import { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";

const RouteChip = styled(Chip)(({ theme }) => ({
  cursor: "pointer",
  "&.MuiChip-filled": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    marginBottom: "10px"
  },
  "&.MuiChip-outlined": {
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
        marginBottom: "10px"

  },
}));

const DetailsPage = () => {
  const { loading } = useLoader();
  const { data } = useTollData();
  const [currentRoute, setCurrentRoute] = useState<Routes | null>(null);
  const { palette } = useTheme();

  useEffect(() => {
    if (data?.routes?.length) {
      setCurrentRoute(data.routes[0]);
    } else {
      setCurrentRoute(null)
    }
  }, [data]);

  if (loading) {
    return (
      <Box sx={{ minHeight: 400, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!data?.routes?.length) {
    return (
      <Box sx={{ minHeight: 400, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography>No routes available.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: 600, display: "flex", flexDirection: "column", alignItems: "center", p: 2 }}>
      <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center" alignItems="center" mb={2}>
        <Typography variant="subtitle1" sx={{ mr: 1 }}>
          Routes:
        </Typography>
        {data.routes.map((route: Routes, idx) => (
          <RouteChip
            key={route.summary.name + idx}
            label={route.summary.name}
            color={currentRoute?.summary.name === route.summary.name ? "primary" : "default"}
            onClick={() => setCurrentRoute(route)}
            sx={{ m: 0.5, cursor: "pointer" }}
            variant={currentRoute?.summary.name === route.summary.name ? "filled" : "outlined"}
          />
        ))}
      </Stack>
      {currentRoute && (
        <Card
          sx={{
            width: "100%",
            minWidth: 100,
            mt: 2,
            border: `1px solid ${palette.divider}`,
            backgroundColor: palette.background.paper,
            boxShadow: 3,
          }}
        >
          <CardHeader
            title={`${currentRoute.tolls.length} Toll${currentRoute.tolls.length !== 1 ? "s" : ""} on the way`}
            sx={{
              backgroundColor: palette.primary.main,
              color: palette.primary.contrastText,
              py: 2,
            }}
          />
          <Divider />
          <CardContent sx={{ backgroundColor: palette.background.default }}>
            {currentRoute.tolls.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
          No tolls on this route.
              </Typography>
            ) : (
              <Stack spacing={2}>
          {currentRoute.tolls.map((toll) => (
            <Container
              key={toll.id}
              sx={{
                width: "100%",
                py: 1.5,
                backgroundColor: palette.action.hover,
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              <Typography variant="body1" fontWeight="bold" color="text.primary">
                {toll.name ?? toll.start?.name ?? "Unnamed Toll"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Cash: {toll.cashCost} {toll.currency} | Tag: {toll.tagCost} {toll.currency}
              </Typography>
            </Container>
          ))}
              </Stack>
            )}
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default DetailsPage;
