package com.estimation.car.support;

import com.estimation.car.entity.Car;
import com.estimation.car.entity.DrivingType;
import com.estimation.car.entity.Engine;
import com.estimation.car.entity.Mission;
import com.estimation.car.entity.Model;

public class ModelFixture {
    public static Model createModel(Car car, Engine engine, DrivingType drivingType, Mission mission, String trimName) {
        return Model.builder()
                    .car(car)
                    .engine(engine)
                    .drivingType(drivingType)
                    .mission(mission)
                    .trimName(trimName)
                    .name("default name")
                    .price(12_340_000)
                    .build();
    }
}
