import { IAddress, VehicleTypeKeys } from "./types";

export interface IGeocodingFeature {
  center: number[];
  place_name: string;
}

export interface IGeocodingResponse {
  features: IGeocodingFeature[];
}

export interface IPostData {
  from: IAddress;
  to: IAddress;
  vehicle: VehicleTypeKeys;
}

export type TollPoint = {
  id?: number;
  lat: number;
  lng: number;
  name: string;
  road: string;
  state: string;
  country: string;
  arrival?: {
    distance: number;
    time: string;
  };
  timestamp_formatted: string;
  timestamp_localized: string;
  point: {
    type: "Feature";
    geometry: {
      type: "Point";
      coordinates: [number, number];
    };
  };
  height?: number | null;
};

export type Toll = {
  id?: number;
  type: string;
  tagCost: number;
  tagPriCost: number;
  tagSecCost?: number | null;
  cashCost: number;
  licensePlateCost?: number | null;
  prepaidCardCost?: number | null;
  currency: string;
  tagPrimaryNames: string[];
  prepaidCardNames: string[];
  tagPrimary: string[];
  start?: TollPoint;
  end?: TollPoint;
};

export type RouteSummary = {
  hasTolls: boolean;
  hasExpressTolls: boolean;
  diffs: {
    cheapest: number;
    fastest: number;
  };
  url: string;
  distance: {
    text: string;
    metric: string;
    value: number;
  };
  duration: {
    text: string;
    value: number;
  };
  name: string;
};

export type Costs = {
  licensePlate: number | null;
  prepaidCard: number | null;
  fuel: number;
  tag: number;
  cash: number;
  tagAndCash: number;
  maximumTollCost: number;
  minimumTollCost: number;
};

/////
export type Routes = {
  summary: RouteSummary;
  costs: Costs;
  tolls: Toll[];
  polyline: string;
};

export type Location = {
  lat: number;
  lng: number;
};

export type RoutePoint = {
  location: Location;
};

export type FuelPrice = {
  value: number;
  currency: string;
  units: string;
  fuelUnit: string;
};

export type FuelEfficiency = {
  city: number;
  hwy: number;
  units: string;
  fuelUnit: string;
};

export type Units = {
  currencyUnit: string;
  fuelEfficiencyUnit: string;
  fuelUnit: string;
};

export type Share = {
  name: string;
  prefix: string;
  uuid: string;
  timestamp: string;
  client: string;
};

export type RouteData = {
  route: RoutePoint[];
  countries: string[];
  currency: string;
  vehicleType: string;
  vehicleDescription: string;
  fuelPrice: FuelPrice;
  fuelEfficiency: FuelEfficiency;
  units: Units;
  departureTime: string;
  share: Share;
  source: string;
};

export interface IResponseData {
  routes: Routes[];
  status: string;
  summary: RouteData;
}
