package com.estimation.car.dto.response.car;

import com.estimation.car.entity.Car;
import lombok.Builder;
import lombok.Getter;

@Getter
public class CarResponseDto {
    private final Integer carId;
    private final String carName;
    private final Integer lowPrice;
    private final String carImg;

    @Builder
    public CarResponseDto(final Integer carId, final String carName, final Integer lowPrice, final String carImg) {
        this.carId = carId;
        this.carName = carName;
        this.lowPrice = lowPrice;
        this.carImg = carImg;
    }

    public static CarResponseDto toDto(final Car car) {
        return CarResponseDto.builder()
                             .carId(car.getId())
                             .carName(car.getName())
                             .lowPrice(car.getLowPrice())
                             .carImg(car.getImgPath())
                             .build();
    }
}
