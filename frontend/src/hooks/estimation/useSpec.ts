import { useEffect, useState } from "react";
import { BASE_SPEC } from "src/common/constants/constants";
import { useLocation } from "react-router-dom";
import { getModelIdFrom } from "src/common/utils/location-utils";
import { useModelInfo } from "../queries/model/Model";
import { ModelOptions } from "src/types/Model";
import { SpecOption } from "src/types/Spec";

interface Props {
  selectedOptions: SpecOption[];
  findSpecInfo: (specCode: string) => ModelOptions | undefined;
  findSpecDefaultOptions: (specInfo: ModelOptions) => SpecOption[];
  addOptions: (options: SpecOption[]) => void;
  deleteOptions: (options: SpecOption[]) => void;
}

function useSpec({
  findSpecInfo,
  addOptions,
  deleteOptions,
  findSpecDefaultOptions,
  selectedOptions,
}: Props) {
  const [spec, setSpec] = useState<string>(BASE_SPEC);

  const location = useLocation();
  const modelId = getModelIdFrom(location);

  const modelInfoQuery = useModelInfo(modelId);

  useEffect(() => {
    if (spec && modelInfoQuery.data) {
      const specInfo = findSpecInfo(spec);
      if (!specInfo) {
        return;
      }

      if (spec === BASE_SPEC) {
        deleteOptions(specInfo.options);
        return;
      }
      const defaultOptions = findSpecDefaultOptions(specInfo);
      const newOptions = defaultOptions.filter(
        (defaultOption) =>
          !selectedOptions.find(
            (selected) => selected.optionId === defaultOption.optionId
          )
      );
      addOptions(newOptions);
    }
  }, [spec, modelInfoQuery.data]);

  return [spec, setSpec] as const;
}

export default useSpec;
