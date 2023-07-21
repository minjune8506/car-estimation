import { SpecOption } from "src/types/Spec";

export const action = {
  add: (specOptions: SpecOption[], targetOption: SpecOption): SpecOption[] => {
    return [...specOptions, { ...targetOption, enable: "Y" }];
  },
  delete: (
    specOptions: SpecOption[],
    targetOption: SpecOption
  ): SpecOption[] => {
    return specOptions.filter(
      (option) => option.optionId !== targetOption.optionId
    );
  },
  enable: (
    specOptions: SpecOption[],
    targetOption: SpecOption
  ): SpecOption[] => {
    return specOptions.map((option) => {
      if (option.optionId === targetOption.optionId) {
        option.enable = "Y";
      }
      return option;
    });
  },
  disable: (
    specOptions: SpecOption[],
    targetOption: SpecOption
  ): SpecOption[] => {
    return specOptions.map((option) => {
      if (option.optionId === targetOption.optionId) {
        option.enable = "N";
      }
      return option;
    });
  },
};
