package com.estimation.car.dto.response.mission;

import com.estimation.car.entity.Mission;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
public class MissionFilterResponseDto {
    private final int id;
    private final String name;

    public static MissionFilterResponseDto toDto(Mission mission) {
        return MissionFilterResponseDto.builder()
                                       .id(mission.getId())
                                       .name(mission.getName())
                                       .build();
    }
}
