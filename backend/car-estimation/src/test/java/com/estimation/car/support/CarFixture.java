package com.estimation.car.support;

import com.estimation.car.entity.Car;
import com.estimation.car.entity.CarCategory;

public class CarFixture {

    public static Car AVANTE = createCar(CarCategoryFixture.SEDAN, "더 뉴 아반떼", "avante", 12340000, "avante.jpg");
    public static Car TUCSON = createCar(CarCategoryFixture.SUV, "투싼", "tucson", 12340000, "tucson.jpg");


    public static Car createCar(String name, CarCategory category) {
        return Car.builder()
                       .carCategory(category)
                       .name(name)
                       .build();
    }

    private static Car createCar(CarCategory category, String name, String nameEn, int lowPrice, String imgPath) {
        return Car.builder()
                       .carCategory(category)
                       .name(name)
                       .nameEn(nameEn)
                       .lowPrice(lowPrice)
                       .imgPath(imgPath)
                       .build();
    }
}
