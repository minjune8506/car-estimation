package com.estimation.car.dto.response.option.category;

import com.estimation.car.entity.OptionCategory;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class OptionCategoryResponse {
    private int categoryId;
    private String categoryName;

    public static OptionCategoryResponse from(OptionCategory optionCategory) {
        return OptionCategoryResponse.builder()
                                     .categoryId(optionCategory.getId())
                                     .categoryName(optionCategory.getName())
                                     .build();
    }
}
