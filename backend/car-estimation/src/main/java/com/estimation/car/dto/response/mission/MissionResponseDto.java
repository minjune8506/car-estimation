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

    @Builder
    public MissionResponseDto(final int id, final String name, final String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    public static MissionResponseDto toDto(final Mission mission) {
        return MissionResponseDto.builder()
                                 .id(mission.getId())
                                 .name(mission.getName())
                                 .description(mission.getDescription())
                                 .build();
    }
}
