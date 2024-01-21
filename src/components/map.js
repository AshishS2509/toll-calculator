import { mappls } from "mappls-web-maps";
import { useEffect, useRef } from "react";
const key = process.env.REACT_APP_MAP_MY_INDIA_API;

const mapplesMap = new mappls();

const Map = (props) => {
  const map = useRef(null);

  useEffect(() => {
    mapplesMap.initialize(
      key,
      { map: true },
      () => {
        if (map.current) {
          map.current.remove();
        }
        map.current = mapplesMap.Map({
          id: "map",
          properties: {
            center: [props.latitude, props.longitude],
            draggable: true,
            zoom: 8,
            minZoom: 2,
            maxZoom: 15,
            backgroundColor: "#fff",
          },
        });
      }
    );
  }, [props.latitude, props.longitude, props.marker]);

  return (
    <div id="map" className="d-inline-block col col-lg-7">
    </div>
  );
};

export default Map;
