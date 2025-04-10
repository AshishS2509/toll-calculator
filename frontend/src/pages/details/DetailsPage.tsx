import { Box, Chip, CircularProgress } from "@mui/material";
import { useLoader } from "../../hooks/useLoader";
import { useTollData } from "../../hooks/useTollData";
import { Routes } from "../../types/data.types";

const DetailsPage = () => {
  const { loading } = useLoader();
  const { data } = useTollData();
  return (
    <Box style={{ maxHeight: 400, display: "grid", placeItems: "center" }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {data?.routes?.map((route: Routes) => {
            return <Chip key={route.summary.name} label={route.summary.name} />;
          })}
        </>
      )}
    </Box>
  );
};

export default DetailsPage;
