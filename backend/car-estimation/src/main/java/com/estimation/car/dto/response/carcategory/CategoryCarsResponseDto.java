package com.estimation.car.dto.response.carcategory;

import com.estimation.car.dto.response.car.CarResponseDto;
import com.estimation.car.entity.CarCategory;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class CategoryCarsResponseDto {
    private Integer categoryId;
    private String categoryName;
    private List<CarResponseDto> cars;

    public static CategoryCarsResponseDto toDto(CarCategory carCategory) {
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
