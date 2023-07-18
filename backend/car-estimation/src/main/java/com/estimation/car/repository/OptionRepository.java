package com.estimation.car.repository;

import com.estimation.car.entity.Option;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OptionRepository extends JpaRepository<Option, Integer>, CustomOptionRepository {
}
