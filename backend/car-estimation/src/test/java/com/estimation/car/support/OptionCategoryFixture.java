package com.estimation.car.support;

import com.estimation.car.entity.OptionCategory;

public class OptionCategoryFixture {

    public static OptionCategory PACKAGE = createOptionCategory("패키지");
    public static OptionCategory TUIX = createOptionCategory("tuix");

    private static OptionCategory createOptionCategory(String name) {
        return OptionCategory.builder()
                       .name("패키지")
                       .build();
    }
}
