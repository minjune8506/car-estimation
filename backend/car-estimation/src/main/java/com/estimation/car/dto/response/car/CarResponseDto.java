package com.estimation.car.dto.response.car;

import com.estimation.car.entity.Car;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class CarResponseDto {
    private Integer carId;
    private String carName;
    private Integer lowPrice;
    private String carImg;

    public static CarResponseDto toDto(Car car) {
        return CarResponseDto.builder()
                             .carId(car.getId())
                             .carName(car.getName())
                             .lowPrice(car.getLowPrice())
                             .carImg(car.getImgPath())
                             .build();
    }
}
