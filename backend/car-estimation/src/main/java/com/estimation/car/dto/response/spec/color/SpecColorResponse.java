package com.estimation.car.dto.response.spec.color;

import com.estimation.car.dto.response.exteriorcolor.ExteriorColorResponse;
import com.estimation.car.dto.response.interiorcolor.InteriorColorResponse;
import com.estimation.car.entity.SpecColor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SpecColorResponse {
    private InteriorColorResponse interior;
    private ExteriorColorResponse exterior;

    public static SpecColorResponse from(SpecColor specColor) {
        return SpecColorResponse.builder()
                .interior(InteriorColorResponse.from(specColor.getInteriorColor(), true))
                .exterior(ExteriorColorResponse.from(specColor.getExteriorColor(), true))
                .build();
    }
}
