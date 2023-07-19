package com.estimation.car.support;

import com.estimation.car.entity.Mission;

public class MissionFixture {

    public static Mission AUTO = createMission("A/T");
    public static Mission DCT = createMission("DCT");

    private static Mission createMission(String name) {
        return Mission.builder()
                      .name(name)
                      .build();
    }
}
