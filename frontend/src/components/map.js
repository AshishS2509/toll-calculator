import { mappls } from "mappls-web-maps";
import { useEffect, useRef, useState } from "react";

const mapplsClassObject = new mappls();

const Map = () => {
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
            center: [28.544, 77.5454],
            draggable: true,
            zoom: 5,
            minZoom: 8,
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
  }, []);

  return (
    <div id="map" className=" d-inline-block ratio-4x3 col-8">
      {MapLoaded}
    </div>
  );
};

export default Map;
