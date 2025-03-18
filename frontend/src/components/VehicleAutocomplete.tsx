import { SyntheticEvent } from "react";
import { IVehicleAutocompleteProps } from "../types/props.types";
import CustomAutocomplete from "./shared/Autocomplete";
import { VehicleTypeKeys } from "../types/types";

const options: VehicleTypeKeys[] = [
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

const VehicleAutocomplete = ({ name, onChange }: IVehicleAutocompleteProps) => {
  const handleChange = (
    _: SyntheticEvent<Element, Event>,
    val: VehicleTypeKeys | null
  ) => {
    onChange(val);
  };
  return (
    <CustomAutocomplete
      name={name}
      options={options}
      onChange={handleChange}
      getOptionLabel={(val) => val}
    />
  );
};

export default VehicleAutocomplete;
