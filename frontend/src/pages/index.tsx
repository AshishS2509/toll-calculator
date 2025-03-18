import { lazy } from "react";
import Details from "./Details";

const Map = lazy(() => import("./map"));

const MainPage = () => {
  return (
    <>
      <Details />
      <Map />
    </>
  );
};

export default MainPage;
