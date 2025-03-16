import { Box, Button, Stack, styled } from "@mui/material";
import CustomAccordion from "../../components/Accordion";
import { AiFillCaretDown, AiOutlineSearch } from "react-icons/ai";
import GeocodingAutocomplete from "../../components/GeocodingAutocomplete";
import VehicleAutocomplete from "../../components/VehicleAutocomplete";
import { useSeatchStore } from "../../hooks/useSearchStore";
import { IOptionFormat } from "../../types/data.types";
import { VehicleTypeKeys } from "../../types/types";

const StyledBox = styled(Box)(() => ({
  width: "25vw",
  position: "absolute",
  left: "16px",
  top: "16px",
  zIndex: 1000,
}));

const Details = () => {
  const { setFrom, setTo, setVehicle, from, to, vehicle } = useSeatchStore();
  const handleFromChange = (from: IOptionFormat | null) =>
    from && setFrom({ address: from.address, lat: from.lat, lng: from.lng });
  const handleToChange = (to: IOptionFormat | null) =>
    to && setTo({ address: to.address, lat: to.lat, lng: to.lng });

  const handleVehicleChange = (vehicle: VehicleTypeKeys | null) =>
    vehicle && setVehicle(vehicle);
  return (
    <StyledBox>
      <CustomAccordion
        title="Search"
        expandIcon={<AiFillCaretDown />}
        titleIcon={<AiOutlineSearch size={22} />}
      >
        <Stack spacing={2} pt={1}>
          <GeocodingAutocomplete name="From" onChange={handleFromChange} />
          <GeocodingAutocomplete name="To" onChange={handleToChange} />
          <VehicleAutocomplete name="Vehicle" onChange={handleVehicleChange} />
          <Button
            variant="contained"
            onClick={() => console.log(from, to, vehicle)}
          >
            Get Route
          </Button>
        </Stack>
      </CustomAccordion>
    </StyledBox>
  );
};

export default Details;
