import { AccordionProps } from "@mui/material";
import { IAddress, VehicleTypeKeys } from "./types";

export interface IThemeMode {
  themeMode: "light" | "dark";
  setThemeMode: React.Dispatch<React.SetStateAction<"light" | "dark">>;
}

export interface IAccordionProps extends AccordionProps {
  title: string;
  titleIcon?: React.ReactNode;
  expandIcon?: React.ReactNode;
  children: NonNullable<React.ReactNode>;
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
  onChange: (val: IAddress | null) => void;
}

export interface IVehicleAutocompleteProps {
  name: string;
  onChange: (val: VehicleTypeKeys | null) => void;
}
export interface IFormProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}
