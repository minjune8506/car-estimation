import { useCallback, useState } from "react";
import { ModelOptions } from "src/types/Model";
import { Action, SpecOption } from "src/types/Spec";
import { getModelIdFrom } from "src/common/utils/location-utils";
import { useLocation } from "react-router-dom";
import { BASE_SPEC } from "src/common/constants/constants";
import { specAPI } from "../queries/spec/api";

function useSelectedOptions() {
  const [selectedOptions, setSelectedOptions] = useState<SpecOption[]>([]);

  const initSelectedOptions = (options: SpecOption[]) => {
    setSelectedOptions(options);
  };
  const modelId = getModelIdFrom(useLocation());

  const applyConstraint = async (
    newSelectedOptions: SpecOption[],
    modelOptions: ModelOptions[],
    setModelOptions: (options: ModelOptions[]) => void
  ) => {
    const constraints = await specAPI.fetchOptionConstraints(
      modelId,
      newSelectedOptions.map((selected) => selected.optionId)
    );

    constraints.forEach((constraint) => {
      const constraintSpec = modelOptions.find(
        (spec) => spec.specCode === BASE_SPEC
      );
      if (!constraintSpec) return;

      if (constraint.action === Action.ADD) {
        constraintSpec.options = [
          ...constraintSpec.options,
          { ...constraint.option, enable: "Y" },
        ];
      } else if (constraint.action === Action.DELETE) {
        constraintSpec.options = constraintSpec.options.filter(
          (option) => option.optionId !== constraint.option.optionId
        );
      } else if (constraint.action === Action.ENABLE) {
        constraintSpec.options = constraintSpec.options.map((option) => {
          if (option.optionId === constraint.option.optionId) {
            option.enable = "Y";
          }
          return option;
        });
      } else if (constraint.action === Action.DISABLE) {
        constraintSpec.options = constraintSpec.options.map((option) => {
          if (option.optionId === constraint.option.optionId) {
            option.enable = "N";
          }
          return option;
        });
      }
    });
    const allOptions = modelOptions.flatMap((spec) => spec.options);
    // 변경된 옵션들이 선택되어 있을떄 처리
    const filtered = newSelectedOptions.filter((selected) => {
      const found = allOptions.find(
        (option) => option.optionId === selected.optionId
      );
      // DELETED
      if (!found) return false;
      // DISABLED
      if (found && found.enable === "N") return false;
      return true;
    });

    setModelOptions(modelOptions);
    setSelectedOptions([...filtered]);
  };

  const addOptions = useCallback(
    (options: SpecOption[]) => {
      setSelectedOptions([...selectedOptions, ...options]);
    },
    [selectedOptions]
  );

  const deleteOptions = useCallback(
    (options: SpecOption[]) => {
      const filtered = selectedOptions.filter((selected) =>
        options.find((option) => selected.optionId === option.optionId)
      );
      setSelectedOptions(filtered);
    },
    [selectedOptions]
  );

  return [
    selectedOptions,
    initSelectedOptions,
    addOptions,
    deleteOptions,
    applyConstraint,
  ] as const;
}

export default useSelectedOptions;
