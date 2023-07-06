package com.estimation.car.dto.response.mission;

import com.estimation.car.entity.Mission;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class MissionFilterResponseDto {
    private final int id;
    private final String name;

    @Builder
    public MissionFilterResponseDto(final int id, final String name) {
        this.id = id;
        this.name = name;
    }

    public static MissionFilterResponseDto toDto(final Mission mission) {
        return MissionFilterResponseDto.builder()
                                       .id(mission.getId())
                                       .name(mission.getName())
                                       .build();
    }
}
