export interface IGeocodingFeature {
  center: number[];
  place_name: string;
}

export interface IGeocodingResponse {
  features: IGeocodingFeature[];
}
