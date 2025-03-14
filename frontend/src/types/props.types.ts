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
}
