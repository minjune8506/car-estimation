package com.estimation.car.dto.response.drivingtype;

import com.estimation.car.entity.DrivingType;
import lombok.Builder;
import lombok.Getter;

@Getter
public class DrivingTypeResponseDto {
    private final int id;
    private final String name;
    private final String description;

    @Builder
    public DrivingTypeResponseDto(final int id, final String name, final String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    public static DrivingTypeResponseDto toDto(DrivingType drivingType) {
        return DrivingTypeResponseDto.builder()
                                     .id(drivingType.getId())
                                     .name(drivingType.getName())
                                     .description(drivingType.getDescription())
                                     .build();
    }
}
