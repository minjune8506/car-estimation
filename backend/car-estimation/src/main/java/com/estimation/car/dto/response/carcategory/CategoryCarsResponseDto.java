package com.estimation.car.dto.response.carcategory;

import com.estimation.car.dto.response.car.CarResponseDto;
import com.estimation.car.entity.CarCategory;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class CategoryCarsResponseDto {
    private final int categoryId;
    private final String categoryName;
    private final List<CarResponseDto> cars;


    @Builder
    public CategoryCarsResponseDto(final int categoryId, final String categoryName, final List<CarResponseDto> cars) {
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.cars = cars;
    }

    public static CategoryCarsResponseDto toDto(final CarCategory carCategory) {
        return CategoryCarsResponseDto.builder()
                                      .categoryId(carCategory.getId())
                                      .categoryName(carCategory.getName())
                                      .cars(carCategory.getCars()
                                                       .stream()
                                                       .map(CarResponseDto::toDto)
                                                       .toList())
                                      .build();
    }
}
