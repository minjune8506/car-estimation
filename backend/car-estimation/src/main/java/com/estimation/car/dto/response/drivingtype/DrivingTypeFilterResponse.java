package com.estimation.car.dto.response.drivingtype;

import com.estimation.car.entity.DrivingType;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class DrivingTypeFilterResponse {
    private final int id;
    private final String name;

    public static DrivingTypeFilterResponse from(DrivingType drivingType) {
        return DrivingTypeFilterResponse.builder()
                                           .id(drivingType.getId())
                                           .name(drivingType.getName())
                                           .build();
    }
}
