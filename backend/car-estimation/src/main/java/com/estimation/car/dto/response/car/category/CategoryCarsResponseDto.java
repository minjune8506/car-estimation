package com.estimation.car.dto.response.car.category;

import com.estimation.car.dto.response.car.CarResponseDto;
import com.estimation.car.entity.CarCategory;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class CategoryCarsResponseDto {
    private final int categoryId;
    private final String categoryName;
    private final List<CarResponseDto> cars;

    public static CategoryCarsResponseDto from(final CarCategory carCategory) {
        return CategoryCarsResponseDto.builder()
                                      .categoryId(carCategory.getId())
                                      .categoryName(carCategory.getName())
                                      .cars(carCategory.getCars()
                                                       .stream()
                                                       .map(CarResponseDto::from)
                                                       .toList())
                                      .build();
    }
}
