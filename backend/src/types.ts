export type Position = {
  address: string;
  lat: number;
  lng: number;
};

export type Weight = {
  value: number;
  unit: string;
};

export type Dimension = {
  value: number;
  unit: string;
};

export type Vehicle = {
  type: string;
  weight: Weight;
  height: Dimension;
  length: Dimension;
  axles: number;
  emissionClass: string;
};

export type Route = {
  from: Position;
  to: Position;
  waypoints: Array<{ address: string }>;
  serviceProvider: string;
  vehicle: Vehicle;
};

export type Location = {
  lat: number;
  lng: number;
};

export type Address = {
  location: Location;
  address: string;
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

export type Cost = {
  tagAndCash: number;
  minimumTollCost: number;
  maximumTollCost: number;
  fuel: number;
  tag: number;
  cash: number;
  prepaidCard: number;
  licensePlate: number | null;
};

export type Toll = {
  id: number;
  lat: number;
  lng: number;
  name: string;
  road: string;
  state: string;
  country: string;
  type: string;
  tagCost: number;
  tagPriCost: number;
  cashCost: number;
  prepaidCardCost: number;
  currency: string;
  tagPrimaryNames: string[];
  prepaidCardNames: string[];
  tagPrimary: string[];
  tagSecondary: string[];
  licensePlateNames: string[];
  discountCarDetails: string;
  discountCarType: string;
  arrival: {
    distance: number;
    time: string;
  };
  timestamp_formatted: string;
  timestamp_localized: string;
  point: {
    type: string;
    geometry: {
      type: string;
      coordinates: [number, number];
    };
  };
  tagRequested: string;
  tollAgencyNames: string[];
  tollAgencyAbbr: string[];
  licensePlateCost: number | null;
  height: number | null;
};

export type RouteDetails = {
  summary: RouteSummary;
  costs: Cost;
  tolls: Toll[];
  polyline: string;
};

export type Summary = {
  route: Address[];
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

export interface SuccessResponse {
  status: number;
  summary: Summary;
  routes: RouteDetails[];
  meta?: Record<string, unknown>;
}

export interface ErrorResponse {
  error: true;
  message: string;
  status?: number;
}

export type ApiResponse = SuccessResponse | ErrorResponse;
