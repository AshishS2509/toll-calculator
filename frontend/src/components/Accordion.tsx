import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  styled,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { IAccordionProps } from "../types/props.types";

const DetailBox = styled(AccordionDetails)(() => {
  const mobile = useMediaQuery("(max-width: 500px)");
  return {
    maxHeight: mobile ? "33vh" : "80vh",
    overflowY: "auto",
  };
});

const SummaryBox = styled(AccordionSummary)(() => {
  const mobile = useMediaQuery("(max-width: 500px)");
  return {
    minHeight: mobile ? "36px !important" : "48px !important",
    height: mobile ? "40px" : "48px",
    "&.Mui-expanded": {
      minHeight: mobile ? "36px !important" : "48px !important",
      height: mobile ? "40px" : "48px",
    },
  };
});

const Title = styled(Typography)(() => {
  const mobile = useMediaQuery("(max-width: 500px)");
  return {
    fontSize: mobile ? "14px" : "16px",
  };
});

const CustomAccordion = ({
  title,
  expandIcon,
  titleIcon,
  children,
}: IAccordionProps) => {
  const [expand, setExpand] = useState<boolean>(false);
  return (
    <Accordion expanded={expand}>
      <SummaryBox expandIcon={expandIcon} onClick={() => setExpand(!expand)}>
        {titleIcon}
        <Title paddingX={2}>{title}</Title>
      </SummaryBox>
      <Divider />
      <DetailBox>{children}</DetailBox>
    </Accordion>
  );
};

export default CustomAccordion;
