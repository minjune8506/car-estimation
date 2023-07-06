package com.estimation.car.repository;

import com.estimation.car.entity.DrivingType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DrivingTypeRepository extends JpaRepository<DrivingType, Integer> {
}
