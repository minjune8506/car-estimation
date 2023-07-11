package com.estimation.car.dto.response.drivingtype;

import com.estimation.car.entity.DrivingType;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class DrivingTypeResponseDto {
    private final int id;
    private final String name;
    private final String description;

    public static DrivingTypeResponseDto from(DrivingType drivingType) {
        return DrivingTypeResponseDto.builder()
                                     .id(drivingType.getId())
                                     .name(drivingType.getName())
                                     .description(drivingType.getDescription())
                                     .build();
    }
}
