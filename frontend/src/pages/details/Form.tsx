import { Button, Stack } from "@mui/material";
import { IFormProps } from "../../types/props.types";
import GeocodingAutocomplete from "../../components/GeocodingAutocomplete";
import VehicleAutocomplete from "../../components/VehicleAutocomplete";
import { useSeatchStore } from "../../hooks/useSearchStore";
import { IAddress, VehicleTypeKeys } from "../../types/types";
import { LngLat, LngLatBounds, Marker } from "maplibre-gl";
import { useMapStore } from "../../hooks/useMap";
import { useRef } from "react";

const Form = ({ handleSubmit }: IFormProps) => {
  const fromRef = useRef<Marker | null>(null);
  const toRef = useRef<Marker | null>(null);

  const { setFrom, setTo, setVehicle, from, to } = useSeatchStore();
  const { map } = useMapStore();

  const setBounds = (currentFrom: IAddress, currentTo: IAddress) => {
    const bounds = new LngLatBounds()
      .extend([currentFrom.lng, currentFrom.lat])
      .extend([currentTo.lng, currentTo.lat]);
    map?.fitBounds(bounds, {
      padding: 20,
      duration: 1000,
      linear: true,
      animate: true,
    });
  };
  const handleChange = (
    type: string,
    location: IAddress | null,
    vehicle: string | null
  ) => {
    switch (type) {
      case "From":
        if (location) {
          setFrom(location);
          if (fromRef.current)
            fromRef.current.setLngLat(new LngLat(location.lng, location.lat));
          else
            fromRef.current = new Marker()
              .setLngLat(new LngLat(location.lng, location.lat))
              .addTo(map!);
          if (to) setBounds(location, to);
          else
            map?.flyTo({
              center: [location.lng, location.lat],
              zoom: 12,
            });
        }
        break;
      case "To":
        if (location) {
          setTo(location);
          if (toRef.current)
            toRef.current.setLngLat(new LngLat(location.lng, location.lat));
          else
            toRef.current = new Marker()
              .setLngLat(new LngLat(location.lng, location.lat))
              .addTo(map!);
          if (from) setBounds(from, location);
          else
            map
              ?.setCenter(new LngLat(location.lng, location.lat))
              .zoomTo(12, { duration: 1000 });
        }
        break;
      case "Vehicle":
        setVehicle(vehicle as VehicleTypeKeys);
        break;
    }
  };

  return (
    <Stack spacing={2} pt={1} component={"form"} onSubmit={handleSubmit}>
      <GeocodingAutocomplete
        name="From"
        onChange={(location) => handleChange("From", location, null)}
      />
      <GeocodingAutocomplete
        name="To"
        onChange={(location) => handleChange("To", location, null)}
      />
      <VehicleAutocomplete
        name="Vehicle"
        onChange={(vehicle) => handleChange("Vehicle", null, vehicle)}
      />
      <Button type="submit" variant="contained" fullWidth>
        Get Route
      </Button>
    </Stack>
  );
};

export default Form;
