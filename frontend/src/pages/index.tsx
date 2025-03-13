import { lazy } from "react";

const Map = lazy(() => import("./map"));

const MainPage = () => {
  return <Map />;
};

export default MainPage;
