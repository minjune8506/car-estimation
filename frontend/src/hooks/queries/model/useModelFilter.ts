import customAxios from "../../../common/utils/customAxios";
import { Response } from "../../../types/Response";
import { ONE_HOUR } from "../../../common/constants/constants";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { ModelFilterQueryParam, ModelTypes } from "../../../types/ModelFilter";
import { ModelKeys } from "../queryKeys";

async function fetchModelFilter(
  params: ModelFilterQueryParam
): Promise<ModelTypes> {
  const axios = customAxios();

  const response: AxiosResponse<Response<ModelTypes>> = await axios.get(
    "/models/filter",
    { params }
  );

  if (response.data.code) {
    throw new Error(response.data.message);
  }
  return response.data.data;
}

export default (params: ModelFilterQueryParam) => {
  return useQuery<ModelTypes, Error>({
    queryKey: ModelKeys.filter(params),
    queryFn: async () => {
      const data = await fetchModelFilter(params);
      return data;
    },
    staleTime: ONE_HOUR,
  });
};
