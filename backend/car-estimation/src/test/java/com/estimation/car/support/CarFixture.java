package com.estimation.car.support;

import com.estimation.car.entity.Car;
import com.estimation.car.entity.CarCategory;

public class CarFixture {

    public static Car createCar(String name, CarCategory category) {
        return Car.builder()
                  .category(category)
                  .name(name)
                  .build();
    }
}
