package com.estimation.car.dto.response.interiorcolor;

import com.estimation.car.entity.InteriorColor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class InteriorColorResponse {

    private final int id;
    private final String name;
    private final String code;
    private final boolean choiceYn;

    public static InteriorColorResponse from(InteriorColor interiorColor, boolean choiceYn) {
        return InteriorColorResponse.builder()
                       .id(interiorColor.getId())
                       .name(interiorColor.getName())
                       .code(interiorColor.getCode())
                       .choiceYn(choiceYn)
                       .code(interiorColor.getCode())
                       .build();
    }
}
