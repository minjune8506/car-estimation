package com.estimation.car.dto.response.car.category;

import com.estimation.car.dto.response.car.CarResponse;
import com.estimation.car.entity.CarCategory;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class CategoryCarsResponse {
    private final int categoryId;
    private final String categoryName;
    private final List<CarResponse> cars;

    public static CategoryCarsResponse from(final CarCategory carCategory) {
        return CategoryCarsResponse.builder()
                                      .categoryId(carCategory.getId())
                                      .categoryName(carCategory.getName())
                                      .cars(carCategory.getCars()
                                                       .stream()
                                                       .map(CarResponse::from)
                                                       .toList())
                                      .build();
    }
}
