import { lazy, useEffect } from "react";
import { wakeupCall } from "../api/api";
const Loader = lazy(() => import("../components/Loader"));
const Snackbar = lazy(() => import("../components/Snackbar"));
const Details = lazy(() => import("./details"));
const Map = lazy(() => import("./map"));

const MainPage = () => {
  useEffect(() => {
    wakeupCall();
  }, []);
  return (
    <>
      <Loader />
      <Snackbar />
      <Details />
      <Map />
    </>
  );
};

export default MainPage;
