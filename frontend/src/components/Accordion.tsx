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

const DetailBox = styled(AccordionDetails)(({ theme }) => {
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  return {
    maxHeight: mobile ? "33vh" : "80vh",
    overflowY: "auto",
  };
});

const SummaryBox = styled(AccordionSummary)(({ theme }) => {
  return {
    minHeight: "48px !important",
    height: "48px",
    "&.Mui-expanded": {
      minHeight: "48px !important",
      height: "48px",
    },
    [theme.breakpoints.down("sm")]: {
      minHeight: "40px",
      height: "40px",
    },
  };
});

const Title = styled(Typography)(({ theme }) => {
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  return {
    fontSize: mobile ? "14px" : "16px",
  };
});

const CustomAccordion = ({
  title,
  expandIcon,
  titleIcon,
  children,
  ...props
}: IAccordionProps) => {
  return (
    <Accordion {...props}>
      <SummaryBox expandIcon={expandIcon} aria-controls="panel-content">
        {titleIcon}
        <Stack
          style={{ paddingLeft: "8px", width: "100%", position: "relative" }}
        >
          <Title paddingX={2}>{title}</Title>
        </Stack>
      </SummaryBox>
      <Divider />
      <DetailBox>{children}</DetailBox>
    </Accordion>
  );
};

export default CustomAccordion;
