package com.estimation.car.repository.option;

import com.estimation.car.entity.Option;

import java.util.List;

public interface CustomOptionRepository {
    List<Option> findAllByIds(List<Integer> ids);
}
