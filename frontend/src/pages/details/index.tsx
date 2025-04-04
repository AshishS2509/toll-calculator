import { Box, CircularProgress, styled, useMediaQuery } from "@mui/material";
import CustomAccordion from "../../components/Accordion";
import {
  AiFillCaretDown,
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineSearch,
} from "react-icons/ai";
import { useSeatchStore } from "../../hooks/useSearchStore";
import { useMapStore } from "../../hooks/useMap";
import {
  FormEvent,
  startTransition,
  useActionState,
  useEffect,
  useState,
} from "react";
import { fetchData } from "../../api/api";
import { useTollData } from "../../hooks/useTollData";
import decoder from "@mapbox/polyline";
import { IPostData, IResponseData } from "../../types/data.types";
import { useLoader } from "../../hooks/useLoader";
import Form from "./Form";
import DetailsPage from "./DetailsPage";

const FormBox = styled(Box)(() => {
  const mobile = useMediaQuery("(max-width: 500px)");
  return {
    width: mobile ? "calc(100% - 32px)" : "25vw",
    position: "absolute",
    left: "16px",
    top: mobile ? undefined : "16px",
    bottom: mobile ? "16px" : undefined,
    zIndex: 1000,
  };
});

const Details = () => {
  const [openDetails, setOpenDetails] = useState(false);

  const { from, to, vehicle } = useSeatchStore();
  const { setData } = useTollData();
  const { setPolyline } = useMapStore();
  const { setLoading } = useLoader();

  const [data, dispatch, pending] = useActionState(
    (_state: IResponseData | null, postData: IPostData | null) => {
      if (!postData?.from || !postData?.to || !postData?.vehicle) return null;
      const data = fetchData({
        ...postData,
      });
      return data;
    },
    null
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!from || !to || !vehicle) return;
    startTransition(() => dispatch({ from, to, vehicle }));
    setOpenDetails(true);
  };

  useEffect(() => {
    if (!data) return;
    const polylineArray = data.routes.map((route) => route.polyline);
    polylineArray.forEach((polyline, idx) => {
      const coordinates: [number, number][] = decoder
        .decode(polyline)
        .map((coord: [number, number]) => [coord[1], coord[0]]);
      setPolyline(idx, coordinates);
    });
    setData(data);
  }, [data]);

  useEffect(() => {
    setLoading(pending);
  }, [pending]);

  return (
    <FormBox>
      <CustomAccordion
        title={openDetails ? "Details" : "Search"}
        expandIcon={<AiFillCaretDown />}
        titleIcon={
          data ? (
            openDetails ? (
              <AiOutlineLeft size={22} onClick={() => setOpenDetails(false)} />
            ) : (
              <AiOutlineRight size={22} onClick={() => setOpenDetails(true)} />
            )
          ) : (
            <AiOutlineSearch size={22} />
          )
        }
      >
        {openDetails ? (
          pending ? (
            <CircularProgress />
          ) : (
            <DetailsPage />
          )
        ) : (
          <Form handleSubmit={handleSubmit} />
        )}
      </CustomAccordion>
    </FormBox>
  );
};

export default Details;
