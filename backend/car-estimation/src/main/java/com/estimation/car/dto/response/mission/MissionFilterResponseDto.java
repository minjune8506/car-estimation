package com.estimation.car.dto.response.mission;

import com.estimation.car.entity.Mission;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MissionFilterResponseDto {
    private final int id;
    private final String name;

    public static MissionFilterResponseDto from(final Mission mission) {
        return MissionFilterResponseDto.builder()
                                       .id(mission.getId())
                                       .name(mission.getName())
                                       .build();
    }
}
