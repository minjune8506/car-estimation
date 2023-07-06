package com.estimation.car.dto.response.model;

import com.estimation.car.dto.response.drivingtype.DrivingTypeFilterResponseDto;
import com.estimation.car.dto.response.engine.EngineFilterResponseDto;
import com.estimation.car.dto.response.mission.MissionFilterResponseDto;
import com.estimation.car.entity.Model;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
public class ModelFilterResponseDto {
    private final List<EngineFilterResponseDto> engines;
    private final List<MissionFilterResponseDto> missions;
    private final List<DrivingTypeFilterResponseDto> drivingTypes;

    @Builder
    public ModelFilterResponseDto(final List<EngineFilterResponseDto> engines, final List<MissionFilterResponseDto> missions, final List<DrivingTypeFilterResponseDto> drivingTypes) {
        this.engines = engines;
        this.missions = missions;
        this.drivingTypes = drivingTypes;
    }

    public static ModelFilterResponseDto toDto(final List<Model> models) {
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
                     .map(DrivingTypeFilterResponseDto::toDto)
                     .toList();
    }

    private static List<EngineFilterResponseDto> toEngineFilterDto(final List<Model> models) {
        return models.stream()
                     .map(Model::getEngine)
                     .distinct()
                     .map(EngineFilterResponseDto::toDto)
                     .toList();
    }

    private static List<MissionFilterResponseDto> toMissoinFilterDto(final List<Model> models) {
        return models.stream()
                     .map(Model::getMission)
                     .distinct()
                     .map(MissionFilterResponseDto::toDto)
                     .toList();
    }

}
