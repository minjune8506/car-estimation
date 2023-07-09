import QueryString from "qs";
import { Location } from "react-router-dom";

export function getCarIdFrom(location: Location) {
  const { carId } = QueryString.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  return parseInt(carId as string);
}
