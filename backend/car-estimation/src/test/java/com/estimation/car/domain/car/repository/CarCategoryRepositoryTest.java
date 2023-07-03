package com.estimation.car.domain.car.repository;

import com.estimation.car.repository.CarCategoryRepository;
import com.estimation.car.entity.Car;
import com.estimation.car.entity.CarCategory;
import com.estimation.car.repository.CarRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;


@DataJpaTest
class CarCategoryRepositoryTest {

    @Autowired
    private CarCategoryRepository categoryRepository;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private TestEntityManager em;

    @Test
    void 카테고리별_차량들이_조회된다() {
        // given
        CarCategory category = CarCategory.builder()
                                          .name("SUV")
                                          .build();
        categoryRepository.save(category);

        List<Car> cars = new ArrayList<>();
        Car c1 = Car.builder()
                    .name("투싼")
                    .lowPrice(12_000_000)
                    .build();
        c1.changeCategory(category);
        cars.add(c1);

        Car c2 = Car.builder()
                    .name("싼타페")
                    .lowPrice(14_000_000)
                    .build();
        c2.changeCategory(category);
        cars.add(c2);
        carRepository.saveAll(cars);

        em.clear();

        // when
        List<CarCategory> categoryCars = categoryRepository.findAllCategoryWithCar();

        // then
        List<Car> resultCars = categoryCars.get(0).getCars();
        assertThat(categoryCars).hasSize(1);
        assertThat(categoryCars.get(0).getName()).isEqualTo("SUV");
        assertThat(resultCars).hasSize(2);
        assertThat(resultCars.get(0).getName()).isEqualTo(c1.getName());
        assertThat(resultCars.get(1).getName()).isEqualTo(c2.getName());
    }

}
