package com.estimation.car.dto.response.spec.color;

import com.estimation.car.entity.SpecColor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SpecColorResponse {
    private final int interiorColorId;
    private final String interiorColorName;
    private final int exteriorColorId;
    private final String exteriorColorName;

    public static SpecColorResponse from(SpecColor specColor) {
        return SpecColorResponse.builder()
                                .exteriorColorId(specColor.getExteriorColor().getId())
                                .exteriorColorName(specColor.getExteriorColor().getName())
                                .interiorColorId(specColor.getInteriorColor().getId())
                                .interiorColorName(specColor.getInteriorColor().getName())
                                .build();
    }
}
