package com.estimation.car.domain.car.repository;

import com.estimation.car.domain.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarRepository extends JpaRepository<Car, Integer> {
}
