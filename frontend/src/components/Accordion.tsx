import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { IAccordionProps } from "../types/props.types";

const CustomAccordion = ({
  title,
  expandIcon,
  titleIcon,
  children,
}: IAccordionProps) => {
  const [expand, setExpand] = useState<boolean>(false);
  return (
    <Accordion expanded={expand}>
      <AccordionSummary
        expandIcon={expandIcon}
        onClick={() => setExpand(!expand)}
        sx={{
          minHeight: "48px !important",
          height: "48px",
          "&.Mui-expanded": {
            minHeight: "48px !important",
            height: "48px",
          },
        }}
      >
        {titleIcon}
        <Typography component="span" paddingX={2}>
          {title}
        </Typography>
      </AccordionSummary>
      <Divider />
      <AccordionDetails sx={{ maxHeight: "80vh" }}>{children}</AccordionDetails>
    </Accordion>
  );
};

export default CustomAccordion;
