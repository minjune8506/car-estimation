package com.estimation.car.repository.spec.option;

import com.estimation.car.entity.SpecOption;

import java.util.List;
import java.util.Optional;

public interface CustomSpecOptionRepository {

    List<SpecOption> findSpecOptionsBy(int modelId, Optional<Character> specCode);

}
