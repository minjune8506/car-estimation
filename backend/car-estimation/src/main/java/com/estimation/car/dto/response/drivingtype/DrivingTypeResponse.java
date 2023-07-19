package com.estimation.car.dto.response.drivingtype;

import com.estimation.car.entity.DrivingType;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class DrivingTypeResponse {
    private final int id;
    private final String name;
    private final String description;

    public static DrivingTypeResponse from(DrivingType drivingType) {
        return DrivingTypeResponse.builder()
                                     .id(drivingType.getId())
                                     .name(drivingType.getName())
                                     .description(drivingType.getDescription())
                                     .build();
    }
}
