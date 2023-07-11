package com.estimation.car.repository.spec.option.constraints;

import com.estimation.car.entity.SpecOptionConstraint;
import com.estimation.car.entity.id.SpecOptionConstraintId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpecOptionConstraintRepository extends JpaRepository<SpecOptionConstraint, SpecOptionConstraintId>, CustomSpecOptionConstraintRepository {
}
