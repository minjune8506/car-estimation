package com.estimation.car.repository.car.category;

import com.estimation.car.entity.CarCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarCategoryRepository extends JpaRepository<CarCategory, Integer> {

    @Query("select cc from car_category cc join fetch cc.cars order by cc.id")
    List<CarCategory> findAllCategoryWithCar();
}
