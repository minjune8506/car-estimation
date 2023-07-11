package com.estimation.car.dto.response.model;

import com.estimation.car.dto.response.drivingtype.DrivingTypeFilterResponseDto;
import com.estimation.car.dto.response.engine.EngineFilterResponseDto;
import com.estimation.car.dto.response.mission.MissionFilterResponseDto;
import com.estimation.car.entity.Model;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class ModelFilterResponseDto {
    private final List<EngineFilterResponseDto> engines;
    private final List<MissionFilterResponseDto> missions;
    private final List<DrivingTypeFilterResponseDto> drivingTypes;

    public static ModelFilterResponseDto from(final List<Model> models) {
        List<EngineFilterResponseDto> engines = toEngineFilterDto(models);
        List<MissionFilterResponseDto> missions = toMissoinFilterDto(models);
        List<DrivingTypeFilterResponseDto> drivingTypes = toDrivingTypeFilterDto(models);

        return ModelFilterResponseDto.builder()
                                     .engines(engines)
                                     .missions(missions)
                                     .drivingTypes(drivingTypes)
                                     .build();
    }

    private static List<DrivingTypeFilterResponseDto> toDrivingTypeFilterDto(final List<Model> models) {
        return models.stream()
                     .map(Model::getDrivingType)
                     .distinct()
                     .map(DrivingTypeFilterResponseDto::from)
                     .toList();
    }

    private static List<EngineFilterResponseDto> toEngineFilterDto(final List<Model> models) {
        return models.stream()
                     .map(Model::getEngine)
                     .distinct()
                     .map(EngineFilterResponseDto::from)
                     .toList();
    }

    private static List<MissionFilterResponseDto> toMissoinFilterDto(final List<Model> models) {
        return models.stream()
                     .map(Model::getMission)
                     .distinct()
                     .map(MissionFilterResponseDto::from)
                     .toList();
    }

}
