import customAxios from "../../../common/utils/customAxios";
import { Response } from "../../../types/Response";
import { ONE_HOUR } from "../../../common/constants/constants";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { ModelKeys } from "../queryKeys";
import { ModelTrim, ModelTrimQueryParam } from "../../../types/ModelTrim";

async function fetchModelTrims(
  params: ModelTrimQueryParam
): Promise<ModelTrim[]> {
  const axios = customAxios();
  const response: AxiosResponse<Response<ModelTrim[]>> = await axios.get(
    "/models/trims",
    { params }
  );

  if (response.data.code) {
    throw new Error(response.data.message);
  }

  return response.data.data;
}

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
