import { lazy, useEffect } from "react";
import { wakeupCall } from "../api/api";
import Loader from "../components/Loader";
const Details = lazy(() => import("./details"));
const Map = lazy(() => import("./map"));

const MainPage = () => {
  useEffect(() => {
    wakeupCall();
  }, []);
  return (
    <>
      <Loader />
      <Details />
      <Map />
    </>
  );
};

export default MainPage;
