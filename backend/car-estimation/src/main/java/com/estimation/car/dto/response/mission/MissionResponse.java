package com.estimation.car.dto.response.mission;

import com.estimation.car.entity.Mission;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MissionResponse {
    private final int id;
    private final String name;
    private final String description;

    public static MissionResponse from(final Mission mission) {
        return MissionResponse.builder()
                                 .id(mission.getId())
                                 .name(mission.getName())
                                 .description(mission.getDescription())
                                 .build();
    }
}
