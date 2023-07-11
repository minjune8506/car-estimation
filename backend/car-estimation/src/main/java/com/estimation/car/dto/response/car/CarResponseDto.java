package com.estimation.car.dto.response.car;

import com.estimation.car.entity.Car;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CarResponseDto {
    private final int carId;
    private final String carName;
    private final Integer lowPrice;
    private final String carImg;

    public static CarResponseDto from(final Car car) {
        return CarResponseDto.builder()
                             .carId(car.getId())
                             .carName(car.getName())
                             .lowPrice(car.getLowPrice())
                             .carImg(car.getImgPath())
                             .build();
    }
}
