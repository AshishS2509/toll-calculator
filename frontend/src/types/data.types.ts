export interface IGeocodingFeatureProperties {
  country_code: string;
}

export interface IGeocodingFeature {
  center: number[];
  place_name: string;
  properties: IGeocodingFeatureProperties;
}

export interface IGeocodingResponse {
  features: IGeocodingFeature[];
}

export interface IOptionFormat {
  address: string;
  lat: number;
  lng: number;
  country: string;
}
