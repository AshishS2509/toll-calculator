import { Autocomplete, styled, TextField } from "@mui/material";
import { useState } from "react";
import { IAutocompleteProps } from "../types/props.types";

const InputField = styled(TextField)(() => ({
  width: "100%",
  height: "36px",
  fontSize: "14px",
  lineHeight: "16px",
  "& .MuiInputBase-root": { height: "36px" },
}));

const CustomAutocomplete = ({ name }: IAutocompleteProps) => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <Autocomplete
      size="small"
      id={name}
      value={value}
      open={false}
      loading={false}
      options={[]}
      isOptionEqualToValue={(option, value) => option === value}
      getOptionLabel={(option) => option}
      onInputChange={(_event, value) => {
        setValue(value);
      }}
      onChange={() => {
        //
      }}
      renderInput={(params) => (
        <InputField
          name={name}
          label={name}
          onFocus={(event) => {
            event.target.select();
          }}
          {...params}
        />
      )}
    />
  );
};

export default CustomAutocomplete;
