package com.estimation.car.dto.response.car;

import com.estimation.car.entity.Car;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CarResponse {
    private final int carId;
    private final String carName;
    private final String carNameEn;
    private final Integer lowPrice;
    private final String carImg;

    public static CarResponse from(final Car car) {
        return CarResponse.builder()
                .carId(car.getId())
                .carName(car.getName())
                .carNameEn(car.getNameEn())
                .lowPrice(car.getLowPrice())
                .carImg(car.getImgPath())
                .build();
    }
}
