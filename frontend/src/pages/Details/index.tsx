import { Box, Button, Stack, styled } from "@mui/material";
import CustomAccordion from "../../components/Accordion";
import { AiFillCaretDown, AiOutlineSearch } from "react-icons/ai";
import GeocodingAutocomplete from "../../components/GeocodingAutocomplete";
import VehicleAutocomplete from "../../components/VehicleAutocomplete";

const StyledBox = styled(Box)(() => ({
  width: "25vw",
  position: "absolute",
  left: "16px",
  top: "16px",
  zIndex: 1000,
}));

const Details = () => {
  return (
    <StyledBox>
      <CustomAccordion
        title="Search"
        expandIcon={<AiFillCaretDown />}
        titleIcon={<AiOutlineSearch size={22} />}
      >
        <Stack spacing={2} pt={1}>
          <GeocodingAutocomplete name="From" />
          <GeocodingAutocomplete name="To" />
          <VehicleAutocomplete name="Vehicle" />
          <Button variant="contained">Get Route</Button>
        </Stack>
      </CustomAccordion>
    </StyledBox>
  );
};

export default Details;
