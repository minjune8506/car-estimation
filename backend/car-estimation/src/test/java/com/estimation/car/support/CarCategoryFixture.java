package com.estimation.car.support;

import com.estimation.car.entity.CarCategory;

public class CarCategoryFixture {

    public static CarCategory SEDAN = createCarCategory("승용");
    public static CarCategory SUV = createCarCategory("SUV");

    public static CarCategory createCarCategory(String name) {
        return CarCategory.builder()
                          .name(name)
                          .build();
    }
}
