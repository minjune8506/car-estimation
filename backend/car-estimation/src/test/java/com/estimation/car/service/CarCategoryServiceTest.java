package com.estimation.car.service;

import com.estimation.car.dto.response.car.category.CategoryCarsResponseDto;
import com.estimation.car.entity.Car;
import com.estimation.car.entity.CarCategory;
import com.estimation.car.repository.car.category.CarCategoryRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
class CarCategoryServiceTest {

    @Mock
    private CarCategoryRepository carCategoryRepository;

    @InjectMocks
    private CarCategoryService carCategoryService;

    @Test
    void 카테고리별_차량들을_응답_DTO로_변환한다() {
        // given
        List<CarCategory> categories = new ArrayList<>();

        CarCategory category = CarCategory.builder()
                                          .name("SUV")
                                          .build();
        Car car = Car.builder()
                     .name("투싼")
                     .lowPrice(12_000_000)
                     .build();
        car.changeCategory(category);
        categories.add(category);
        given(carCategoryRepository.findAllCategoryWithCar()).willReturn(categories);

        // when
        List<CategoryCarsResponseDto> results = carCategoryService.findAllCategoryWithCars();

        // then
        assertThat(results).hasSize(1);
        CategoryCarsResponseDto result = results.get(0);
        assertThat(result.getCategoryName()).isEqualTo(category.getName());
        assertThat(result.getCars()).hasSize(1);
        assertThat(result.getCars().get(0).getCarName()).isEqualTo("투싼");
    }
}
