import CustomAutocomplete from "./shared/Autocomplete";
import { debounce } from "@mui/material";
import { startTransition, SyntheticEvent, useActionState } from "react";
import { fetchLocation } from "../api/api";
import { IOptionFormat } from "../types/data.types";
import { IGeocodingAutocompleteProps } from "../types/props.types";

const GeocodingAutocomplete = ({
  name,
  onChange,
}: IGeocodingAutocompleteProps) => {
  const [options, action, loading] = useActionState(
    async (_prev: IOptionFormat[], query: string) => {
      const data = await fetchLocation(query);
      const formattedData: IOptionFormat[] = data.map((location) => {
        return {
          address: location.place_name,
          lat: location.center[1],
          lng: location.center[0],
          country: location.properties.country_code,
        };
      });
      return formattedData;
    },
    []
  );

  const debouncedSearch = debounce(async (val: string | null) => {
    if (!val) return;
    startTransition(() => action(val));
  }, 500);

  const handleChange = (
    _: SyntheticEvent<Element, Event>,
    val: IOptionFormat | null
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
