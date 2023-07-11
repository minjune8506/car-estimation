package com.estimation.car.repository.spec.option;

import com.estimation.car.entity.SpecOption;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpecOptionRepository extends JpaRepository<SpecOption, Integer>, CustomSpecOptionRepository {
}
