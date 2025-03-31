import { LinearProgress } from "@mui/material";
import { useLoader } from "../hooks/useLoader";

const Loader = () => {
  const { loading } = useLoader();
  return (
    loading && (
      <LinearProgress
        color="primary"
        style={{
          width: "100%",
          position: "fixed",
          height: "4px",
          zIndex: 1000,
        }}
      />
    )
  );
};

export default Loader;
