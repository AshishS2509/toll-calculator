import { mappls } from "mappls-web-maps";
import { useEffect, useRef, useState } from "react";
const key = process.env.REACT_APP_MAP_MY_INDIA_API;

const mapplsClassObject = new mappls();

const Map = (props) => {
  const map = useRef(null);
  const [MapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    mapplsClassObject.initialize(
      key,
      { map: true },
      () => {
        if (map.current) {
          map.current.remove();
        }
        map.current = mapplsClassObject.Map({
          id: "map",
          properties: {
            center: [props.latitude, props.longitude],
            draggable: true,
            zoom: 8,
            minZoom: 2,
            maxZoom: 15,
            backgroundColor: "#fff",
            traffic: false,
            geolocation: true,
          },
        });
        map.current.on("load", () => {
          setMapLoaded(true);
        });
      }
    );
  }, [props.latitude, props.longitude]);


  return (
    <div id="map" className="d-inline-block col col-lg-7">
      {MapLoaded}
    </div>
  );
};

export default Map;
