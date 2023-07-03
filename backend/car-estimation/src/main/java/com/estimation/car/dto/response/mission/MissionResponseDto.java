package com.estimation.car.dto.response.mission;

import com.estimation.car.entity.Mission;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MissionResponseDto {
    private final int id;
    private final String name;
    private final String description;

    public static MissionResponseDto toDto(Mission mission) {
        return MissionResponseDto.builder()
                                 .id(mission.getId())
                                 .name(mission.getName())
                                 .description(mission.getDescription())
                                 .build();
    }
}
