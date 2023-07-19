package com.estimation.car.dto.response.car;

import com.estimation.car.dto.response.exteriorcolor.ExteriorColorResponse;
import com.estimation.car.dto.response.interiorcolor.InteriorColorResponse;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class CarColorsResponse {
    private final List<ExteriorColorResponse> exteriorColors;
    private final List<InteriorColorResponse> interiorColors;

    public static CarColorsResponse from(List<ExteriorColorResponse> exteriorColors,
                                         List<InteriorColorResponse> interiorColors) {
        return CarColorsResponse.builder()
                               .exteriorColors(exteriorColors)
                               .interiorColors(interiorColors)
                               .build();
    }

}
