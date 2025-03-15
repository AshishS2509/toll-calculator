import CustomAutocomplete from "./shared/Autocomplete";

const options = [
  "Standard Car",
  "Large Car",
  "Extra-Large Car",
  "Electric Car",
  "Large Electric Car",
  "Taxi",
  "Small Truck",
  "Medium Truck",
  "Large Truck",
  "Small Bus",
  "Large Bus",
  "Motorcycle",
  "Large Motorcycle",
  "Small RV",
  "Medium RV",
  "Large RV",
];

const VehicleAutocomplete = ({ name }: { name: string }) => {
  return (
    <CustomAutocomplete
      name={name}
      options={options}
      onSearch={() => {}}
      onChange={() => {}}
      key={new Date().getTime()}
    />
  );
};

export default VehicleAutocomplete;
