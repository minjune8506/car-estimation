import { ONE_HOUR } from "../../../common/constants/constants";
import { useQuery } from "@tanstack/react-query";
import { ModelFilterQueryParam, ModelTypes } from "../../../types/ModelFilter";
import { ModelKeys } from "../queryKeys";
import { fetchModelFilter } from "../api";

export default (params: ModelFilterQueryParam) => {
  return useQuery<ModelTypes, Error>({
    queryKey: ModelKeys.filter(params),
    queryFn: () => fetchModelFilter(params),
    staleTime: ONE_HOUR,
  });
};
