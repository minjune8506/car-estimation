package com.estimation.car.dto.response.drivingtype;

import com.estimation.car.entity.DrivingType;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class DrivingTypeFilterResponseDto {
    private final int id;
    private final String name;

    public static DrivingTypeFilterResponseDto from(DrivingType drivingType) {
        return DrivingTypeFilterResponseDto.builder()
                                           .id(drivingType.getId())
                                           .name(drivingType.getName())
                                           .build();
    }
}
