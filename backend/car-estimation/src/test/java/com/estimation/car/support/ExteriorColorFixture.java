package com.estimation.car.support;

import com.estimation.car.entity.ExteriorColor;

public class ExteriorColorFixture {

    public static ExteriorColor A5G = createExteriorColor("아마존 그레이 메탈릭", "A5G");
    public static ExteriorColor PE2 = createExteriorColor("에코트로닉 그레이펄", "PE2");

    private static ExteriorColor createExteriorColor(String name, String code) {
        return ExteriorColor.builder()
                       .name(name)
                       .code(code)
                       .build();
    }
}
