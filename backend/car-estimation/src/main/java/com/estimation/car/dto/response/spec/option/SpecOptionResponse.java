package com.estimation.car.dto.response.spec.option;

import com.estimation.car.entity.SpecOption;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class SpecOptionResponse {
    private final int optionCategoryId;
    private final String optionCategoryName;
    private final int optionId;
    private final String optionName;
    private final int price;
    private final char unityChoiceYn;
    private final char defaultYn;
    private final String img;

    public static SpecOptionResponse from(SpecOption specOption) {

        return SpecOptionResponse.builder()
                .optionCategoryId(specOption.getOption().getOptionCategory().getId())
                .optionCategoryName(specOption.getOption().getOptionCategory().getName())
                .optionId(specOption.getOption().getId())
                .optionName(specOption.getOption().getName())
                .price(specOption.getPrice())
                .unityChoiceYn(specOption.getUnityChoiceYn())
                .defaultYn(specOption.getDefaultYn())
                .img(specOption.getOption().getImg())
                .build();
    }
}
