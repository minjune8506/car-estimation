package com.estimation.car.dto.response.option;

import com.estimation.car.dto.response.option.category.OptionCategoryResponse;
import com.estimation.car.entity.Option;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class OptionResponse {
    private int optionId;
    private String optionName;
    private OptionCategoryResponse category;

    public static OptionResponse from(Option option) {
        return OptionResponse.builder()
                             .optionId(option.getId())
                             .optionName(option.getName())
                             .category(OptionCategoryResponse.from(option.getOptionCategory()))
                             .build();
    }
}
