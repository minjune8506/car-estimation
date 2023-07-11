package com.estimation.car.repository.spec.option.constraints;

import com.estimation.car.entity.SpecOptionConstraint;

import java.util.List;

public interface CustomSpecOptionConstraintRepository {
    List<SpecOptionConstraint> findConstraints(int modelId, char specCode, int optionId);
}
