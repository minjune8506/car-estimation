import { ONE_HOUR } from "../../../common/constants/constants";
import { useQuery } from "@tanstack/react-query";
import { ModelKeys } from "../queryKeys";
import { ModelTrim, ModelTrimQueryParam } from "../../../types/ModelTrim";
import { fetchModelTrims } from "../api";

export default (params: ModelTrimQueryParam) => {
  return useQuery<ModelTrim[], Error>({
    queryKey: ModelKeys.trim(params),
    queryFn: async () => {
      const data = await fetchModelTrims(params);
      return data;
    },
    staleTime: ONE_HOUR,
  });
};
