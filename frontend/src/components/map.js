/* eslint-disable react-hooks/exhaustive-deps */
import { mappls } from "mappls-web-maps";
import { useEffect, useRef, useState } from "react";
import polyline from "@mapbox/polyline";
const key = process.env.REACT_APP_MAP_MY_INDIA_API;

const mapplsClassObject = new mappls();

const Map = (props) => {
  const map = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  // const [polylineDecoded, setPolylineDecoed] = useState([]);

  useEffect(() => {
    mapplsClassObject.initialize(key, { map: true }, () => {
      if (map.current) {
        map.current.remove();
      }
      map.current = mapplsClassObject.Map({
        id: "map",
        properties: {
          center: [props.latitude, props.longitude],
          draggable: true,
          zoom: 5,
          minZoom: 8,
          maxZoom: 15,
          backgroundColor: "#fff",
          geolocation: false,
          disableDoubleClickZoom: true,
          fullscreenControl: true, 
          scrollWheel: true,
          scrollZoom: true,
          rotateControl: true,
          scaleControl: true,
          zoomControl: true,
          clickableIcons: true,
        },
      });
      map.current.on("load", () => {
        setIsMapLoaded(true);
      });
    });

    const decoder = props.polyline.map(item => polyline.decode(item))
    // const obj = decoder.map(item => item.map(([lat, lng]) => ({lat:lat, lng:lng})));
    console.log(decoder)
    // obj.map(item=>mapplsClassObject.Polyline({
    //   map: map,
    //   polyline: item
    // }))
  }, [props.latitude, props.longitude, props.polyline]);

  return (
    <div id="map" className="d-inline-block col col-lg-7">
    {isMapLoaded}
    </div>
  );
};

export default Map;
