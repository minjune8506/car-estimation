package com.estimation.car.repository.spec.option.constraints;

import com.estimation.car.entity.SpecOptionConstraint;

import java.util.List;

public interface CustomSpecOptionConstraintRepository {
    List<SpecOptionConstraint> findConstraintsBy(int modelId, List<Integer> selectedOptions);

    List<SpecOptionConstraint> findConstraintsBy(int modelId, int optionId);
}
