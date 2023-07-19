package com.estimation.car.support;

import com.estimation.car.entity.Option;
import com.estimation.car.entity.OptionCategory;

public class OptionFixture {

    public static Option SMART_SENSE = createOption("현대 스마트센스", OptionCategoryFixture.PACKAGE, "smart_sense.jpg");
    public static Option HIPASS = createOption("하이패스", OptionCategoryFixture.PACKAGE, "hipass.jpg");

    private static Option createOption(String name, OptionCategory category, String img) {
        return Option.builder()
                       .optionCategory(category)
                       .name(name)
                       .img(img)
                       .build();
    }
}
