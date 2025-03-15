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

export interface IAutocompleteProps {
  name: string;
  options: string[];
  onSearch: (value: string) => void;
  onChange: (event: React.SyntheticEvent, value: string | null) => void;
}

export type VehicleTypeKeys =
  | "Standard Car"
  | "Large Car"
  | "Extra-Large Car"
  | "Electric Car"
  | "Large Electric Car"
  | "Taxi"
  | "Small Truck"
  | "Medium Truck"
  | "Large Truck"
  | "Small Bus"
  | "Large Bus"
  | "Motorcycle"
  | "Large Motorcycle"
  | "Small RV"
  | "Medium RV"
  | "Large RV";
