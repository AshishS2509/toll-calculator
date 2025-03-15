import CustomAutocomplete from "./shared/Autocomplete";

const GeocodingAutocomplete = ({ name }: { name: string }) => {
  return (
    <CustomAutocomplete
      name={name}
      options={[]}
      onSearch={() => {}}
      onChange={() => {}}
      key={new Date().getTime()}
    />
  );
};

export default GeocodingAutocomplete;
