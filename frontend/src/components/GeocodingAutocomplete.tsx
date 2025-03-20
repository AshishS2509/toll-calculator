import CustomAutocomplete from "./shared/Autocomplete";
import { debounce } from "@mui/material";
import { startTransition, SyntheticEvent, useActionState } from "react";
import { fetchLocation } from "../api/api";
import { IGeocodingAutocompleteProps } from "../types/props.types";
import { IAddress } from "../types/types";

const GeocodingAutocomplete = ({
  name,
  onChange,
}: IGeocodingAutocompleteProps) => {
  const [options, action, loading] = useActionState(
    async (_prev: IAddress[], query: string) => {
      if (!query) return [];
      const data = await fetchLocation(query);
      const formattedData: IAddress[] = data.map((location) => {
        return {
          address: location.place_name,
          lat: location.center[1],
          lng: location.center[0],
        };
      });
      return Array.from(
        new Set(formattedData.map((loc) => JSON.stringify(loc)))
      ).map((str) => JSON.parse(str));
    },
    []
  );

  const debouncedSearch = debounce(async (val: string | null) => {
    if (!val) return;
    startTransition(() => action(val));
  }, 500);

  const handleChange = (
    _: SyntheticEvent<Element, Event>,
    val: IAddress | null
  ) => {
    onChange(val);
  };

  return (
    <CustomAutocomplete
      name={name}
      options={options}
      onSearch={(value) => {
        if (!value.length) debouncedSearch(null);
        if (value.length > 2) debouncedSearch(value);
      }}
      getOptionLabel={(option) => option.address}
      loading={loading}
      onChange={handleChange}
    />
  );
};

export default GeocodingAutocomplete;
