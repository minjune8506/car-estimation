package com.estimation.car.repository;

import com.estimation.car.entity.Model;

import java.util.List;

public interface ModelCustomRepository {

    List<Model> filterModels(int carId, Integer engineId, Integer missionId);

    List<Model> findTrims(int carId, int engineId, int missionId, int drivingTypeId);
}
