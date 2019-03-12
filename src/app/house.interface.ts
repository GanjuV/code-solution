export interface HouseDTO {
  coords: {
    lat: number;
    lon: number;
  };
  params: {
    rooms: number;
    value: number;
  };
  street: string;
  distance: number;
}
