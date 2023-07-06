package com.estimation.car.support;

import com.estimation.car.entity.DrivingType;

public class DrivingTypeFixture {
    public static DrivingType _2WD = createDrivingType("2WD");
    public static DrivingType _4WD = createDrivingType("4WD");

    public static DrivingType createDrivingType(String name) {
        return DrivingType.builder()
                          .name(name)
                          .build();
    }
}
