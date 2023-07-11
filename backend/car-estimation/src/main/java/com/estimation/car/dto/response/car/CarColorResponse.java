package com.estimation.car.dto.response.car;

import com.estimation.car.dto.response.exteriorcolor.ExteriorColorResponse;
import com.estimation.car.dto.response.interiorcolor.InteriorColorResponse;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class CarColorResponse {
    private final List<ExteriorColorResponse> exteriorColors;
    private final List<InteriorColorResponse> interiorColors;

    public static CarColorResponse from(List<ExteriorColorResponse> exteriorColors,
                                        List<InteriorColorResponse> interiorColors) {
        return CarColorResponse.builder()
                               .exteriorColors(exteriorColors)
                               .interiorColors(interiorColors)
                               .build();
    }

}
