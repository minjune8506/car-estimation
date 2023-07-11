package com.estimation.car.dto.response.exteriorcolor;

import com.estimation.car.entity.ExteriorColor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ExteriorColorResponse {
    private final int id;
    private final String name;
    private final boolean choiceYn;

    public static ExteriorColorResponse from(ExteriorColor exteriorColor, boolean choiceYn) {
        return ExteriorColorResponse.builder()
                                    .id(exteriorColor.getId())
                                    .name(exteriorColor.getName())
                                    .choiceYn(choiceYn)
                                    .build();
    }
}
