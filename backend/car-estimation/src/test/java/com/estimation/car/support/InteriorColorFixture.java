package com.estimation.car.support;

import com.estimation.car.entity.ExteriorColor;
import com.estimation.car.entity.InteriorColor;

public class InteriorColorFixture {

    public static InteriorColor NNB = createInteriorColor("블랙 모노톤", "NNB");
    public static InteriorColor SSS = createInteriorColor("세이지 그린", "SSS");

    private static InteriorColor createInteriorColor(String name, String code) {
        return InteriorColor.builder()
                       .name(name)
                       .code(code)
                       .build();
    }
}
