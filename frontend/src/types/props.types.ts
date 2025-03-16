import { IOptionFormat } from "./data.types";
import { VehicleTypeKeys } from "./types";

export interface IThemeMode {
  themeMode: "light" | "dark";
  setThemeMode: React.Dispatch<React.SetStateAction<"light" | "dark">>;
}

export interface IAccordionProps {
  title: string;
  titleIcon?: React.ReactNode;
  expandIcon?: React.ReactNode;
  children: React.ReactNode;
}

export interface IAutocompleteProps<T> {
  name: string;
  options: T[];
  loading?: boolean;
  onSearch?: (value: string) => void;
  onChange: (event: React.SyntheticEvent, value: T | null) => void;
  getOptionLabel: (option: T) => string;
}

export interface IGeocodingAutocompleteProps {
  name: string;
  onChange: (val: IOptionFormat | null) => void;
}

export interface IVehicleAutocompleteProps {
  name: string;
  onChange: (val: VehicleTypeKeys | null) => void;
}
