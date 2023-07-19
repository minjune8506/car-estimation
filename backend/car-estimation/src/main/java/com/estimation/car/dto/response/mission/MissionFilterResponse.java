package com.estimation.car.dto.response.mission;

import com.estimation.car.entity.Mission;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MissionFilterResponse {
    private final int id;
    private final String name;

    public static MissionFilterResponse from(final Mission mission) {
        return MissionFilterResponse.builder()
                                       .id(mission.getId())
                                       .name(mission.getName())
                                       .build();
    }
}
