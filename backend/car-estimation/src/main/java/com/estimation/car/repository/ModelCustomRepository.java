package com.estimation.car.repository;

import com.estimation.car.entity.Model;

import java.util.List;
import java.util.Optional;

public interface ModelCustomRepository {

    List<Model> filterModels(int carId, Optional<Integer> engineId, Optional<Integer> missionId);

    List<Model> findTrims(int carId, int engineId, int missionId, int drivingTypeId);
}
