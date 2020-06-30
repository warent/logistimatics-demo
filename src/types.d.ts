type Coordinate = {
  id: string;
  order: number;
  latitude: number;
  longitude: number;
}
type MutableCoordinate = {
  id: string;
  order: number;
  latitude: number | string;
  longitude: number | string;
}