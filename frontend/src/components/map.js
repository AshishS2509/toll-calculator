import { mappls } from "mappls-web-maps";
import { useEffect, useRef, useState } from "react";

const mapplsClassObject = new mappls();

const Map = (props) => {
  console.log(props)
  const map = useRef(null);
  const [MapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    mapplsClassObject.initialize(
      "4f469f8a7c8ceef9fa8abb1919846775",
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
            zoom: 9,
            minZoom: 9,
            maxZoom: 15,
            backgroundColor: "#fff",
            traffic: true,
            geolocation: false,
            disableDoubleClickZoom: true,
            fullscreenControl: true, 
            scrollWheel: true, 
            scrollZoom: true, 
            rotateControl: true,
            scaleControl: true,
            zoomControl: true,
            clickableIcons: true,
            tilt: 0,
          },
        });
        map.current.on("load", () => {
          setMapLoaded(true);
        });
      }
    );
  }, [props.latitude, props.longitude]);

  return (
    <div id="map" className=" d-inline-block ratio-4x3 col-lg-8">
      {MapLoaded}
    </div>
  );
};

export default Map;
