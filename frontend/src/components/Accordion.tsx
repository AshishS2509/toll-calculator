import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Stack,
  styled,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { IAccordionProps } from "../types/props.types";

const DetailBox = styled(AccordionDetails)(() => {
  const mobile = useMediaQuery("(max-width: 500px)");
  return {
    maxHeight: mobile ? "33vh" : "80vh",
    overflowY: "auto",
  };
});

const SummaryBox = styled(AccordionSummary)(() => {
  return {
    minHeight: "48px !important",
    height: "48px",
    "&.Mui-expanded": {
      minHeight: "48px !important",
      height: "48px",
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
  return (
    <Accordion>
      <SummaryBox expandIcon={expandIcon}>
        {titleIcon}
        <Stack style={{ paddingLeft: "8px", width: "100%" }}>
          <Title paddingX={2}>{title}</Title>
        </Stack>
      </SummaryBox>
      <Divider />
      <DetailBox>{children}</DetailBox>
    </Accordion>
  );
};

export default CustomAccordion;
