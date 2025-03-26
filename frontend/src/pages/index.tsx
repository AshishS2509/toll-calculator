import { lazy, useEffect } from "react";
import { wakeupCall } from "../api/api";
const Details = lazy(() => import("./details"));
const Map = lazy(() => import("./map"));

const MainPage = () => {
  useEffect(() => {
    wakeupCall();
  }, []);
  return (
    <>
      <Details />
      <Map />
    </>
  );
};

export default MainPage;
