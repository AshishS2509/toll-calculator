import { Box, styled } from "@mui/material";
import CustomAccordion from "../../components/Accordion";
import { AiFillCaretDown, AiOutlineSearch } from "react-icons/ai";
import CustomAutocomplete from "../../components/Autocomplete";

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
        <CustomAutocomplete name="from" />
      </CustomAccordion>
    </StyledBox>
  );
};

export default Details;
