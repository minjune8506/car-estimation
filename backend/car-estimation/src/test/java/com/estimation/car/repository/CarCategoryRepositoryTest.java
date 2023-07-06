package com.estimation.car.repository;

import com.estimation.car.common.config.QuerydslConfig;
import com.estimation.car.entity.Car;
import com.estimation.car.entity.CarCategory;
import com.estimation.car.support.CarCategoryFixture;
import com.estimation.car.support.CarFixture;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.annotation.Import;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;


@DataJpaTest
@Import(QuerydslConfig.class)
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
        CarCategory suv = categoryRepository.save(CarCategoryFixture.SUV);

        Car c1 = CarFixture.createCar("투싼", suv);
        c1 = carRepository.save(c1);

        Car c2 = CarFixture.createCar("싼타페", suv);
        c2 = carRepository.save(c2);

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
