import { Box, styled, useMediaQuery } from "@mui/material";
import CustomAccordion from "../../components/Accordion";
import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiOutlineSearch,
} from "react-icons/ai";
import { useSeatchStore } from "../../hooks/useSearchStore";
import { useMapStore } from "../../hooks/useMap";
import {
  FormEvent,
  startTransition,
  useActionState,
  useEffect,
  // useRef,
  useState,
} from "react";
import { fetchData } from "../../api/api";
import { useTollData } from "../../hooks/useTollData";
import decoder from "@mapbox/polyline";
import { IPostData, IResponseData } from "../../types/data.types";
import { useLoader } from "../../hooks/useLoader";
import Form from "./Form";
import DetailsPage from "./DetailsPage";
import { useSnackbar } from "../../hooks/useSnackbar";

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
  // const accordionRef = useRef(null);

  const { from, to, vehicle } = useSeatchStore();
  const { setData } = useTollData();
  const { setPolyline, addMarker } = useMapStore();
  const { setLoading } = useLoader();
  const { setOpenSnakcbar } = useSnackbar();
  const mobile = useMediaQuery("(max-width: 500px)");

  const [data, dispatch, pending] = useActionState(
    async (_state: IResponseData | null, postData: IPostData | null) => {
      if (!postData?.from || !postData?.to || !postData?.vehicle) return null;
      try {
        const response = await fetchData(postData);
        if (!response) throw "Error fetching data";
        return response;
      } catch (error) {
        console.error("Fetch Error:", error);
        setOpenSnakcbar(true);
        throw error; // so we can handle it in useEffect
      }
    },
    null
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!from || !to || !vehicle) return;

    setData(undefined);
    startTransition(() => dispatch({ from, to, vehicle }));
    setOpenDetails(true);
  };

  useEffect(() => {
    console.log(data);
    const processFetchedData = async () => {
      if (!data) return;

      try {
        const polylineArray = data.routes.map((route) => route.polyline);
        polylineArray.forEach((polyline, idx) => {
          const coordinates: [number, number][] = decoder
            .decode(polyline)
            .map(([lat, lng]) => [lng, lat]); // map correctly
          const id = `${Date.now()}-${idx}`;
          setPolyline(id, coordinates);
        });
        data.routes.forEach((route) => {
          route.tolls.forEach((toll) => {
            const { lat, lng } = toll;

            if (lat && lng) {
              addMarker([lng, lat]);
            }
            return;
          });
        });

        setData(data);
      } catch (error) {
        console.error("Processing Error:", error);
        setOpenDetails(false);
        setOpenSnakcbar(true);
      }
    };

    processFetchedData();
  }, [data, setData, setPolyline, setOpenDetails, setOpenSnakcbar]);

  useEffect(() => {
    if (!pending && !data) {
      setOpenDetails(false);
    }
    setLoading(pending);
  }, [pending, data, setLoading]);

  return (
    <FormBox>
      <CustomAccordion
        title={openDetails ? "Details" : "Search"}
        expandIcon={mobile ? <AiFillCaretUp /> : <AiFillCaretDown />}
        titleIcon={<AiOutlineSearch size={22} />}
      >
        {openDetails ? <DetailsPage /> : <Form handleSubmit={handleSubmit} />}
      </CustomAccordion>
    </FormBox>
  );
};

export default Details;
