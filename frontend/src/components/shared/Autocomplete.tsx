import { Autocomplete, styled, TextField } from "@mui/material";
import { IAutocompleteProps } from "../../types/props.types";

const InputField = styled(TextField)(() => ({
  width: "100%",
  height: "36px",
  fontSize: "14px",
  lineHeight: "16px",
  "& .MuiInputBase-root": { height: "36px" },
}));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CustomAutocomplete = <_P, T>({
  name,
  options,
  loading,
  onSearch,
  onChange,
  getOptionLabel,
}: IAutocompleteProps<T>) => {
  return (
    <Autocomplete
      size="small"
      fullWidth
      id={name}
      loading={loading}
      options={options}
      noOptionsText="Enter at least 3 characters"
      isOptionEqualToValue={(option, value) => option === value}
      getOptionLabel={getOptionLabel}
      onInputChange={(_event, value) => {
        onSearch?.(value);
      }}
      onChange={onChange}
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
