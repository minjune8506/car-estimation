package com.estimation.car.dto.response.model;

import com.estimation.car.dto.response.drivingtype.DrivingTypeFilterResponse;
import com.estimation.car.dto.response.engine.EngineFilterResponse;
import com.estimation.car.dto.response.mission.MissionFilterResponse;
import com.estimation.car.entity.Model;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class ModelFilterResponse {
    private final List<EngineFilterResponse> engines;
    private final List<MissionFilterResponse> missions;
    private final List<DrivingTypeFilterResponse> drivingTypes;

    public static ModelFilterResponse from(final List<Model> models) {
        List<EngineFilterResponse> engines = toEngineFilterDto(models);
        List<MissionFilterResponse> missions = toMissoinFilterDto(models);
        List<DrivingTypeFilterResponse> drivingTypes = toDrivingTypeFilterDto(models);

        return ModelFilterResponse.builder()
                                     .engines(engines)
                                     .missions(missions)
                                     .drivingTypes(drivingTypes)
                                     .build();
    }

    private static List<DrivingTypeFilterResponse> toDrivingTypeFilterDto(final List<Model> models) {
        return models.stream()
                     .map(Model::getDrivingType)
                     .distinct()
                     .map(DrivingTypeFilterResponse::from)
                     .toList();
    }

    private static List<EngineFilterResponse> toEngineFilterDto(final List<Model> models) {
        return models.stream()
                     .map(Model::getEngine)
                     .distinct()
                     .map(EngineFilterResponse::from)
                     .toList();
    }

    private static List<MissionFilterResponse> toMissoinFilterDto(final List<Model> models) {
        return models.stream()
                     .map(Model::getMission)
                     .distinct()
                     .map(MissionFilterResponse::from)
                     .toList();
    }

}
