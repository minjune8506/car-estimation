package com.estimation.car.dto.response.drivingtype;

import com.estimation.car.entity.DrivingType;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class DrivingTypeFilterResponseDto {
    private final int id;
    private final String name;

    @Builder
    public DrivingTypeFilterResponseDto(final int id, final String name) {
        this.id = id;
        this.name = name;
    }

    public static DrivingTypeFilterResponseDto toDto(DrivingType drivingType) {
        return DrivingTypeFilterResponseDto.builder()
                                           .id(drivingType.getId())
                                           .name(drivingType.getName())
                                           .build();
    }
}
