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
@Builder
@ToString
public class ModelFilterResponseDto {
    private final List<EngineFilterResponseDto> engines;
    private final List<MissionFilterResponseDto> missions;
    private final List<DrivingTypeFilterResponseDto> drivingTypes;

    public static ModelFilterResponseDto toDto(List<Model> models) {
        List<EngineFilterResponseDto> engines = models.stream()
                                                      .map(Model::getEngine)
                                                      .distinct()
                                                      .map(EngineFilterResponseDto::toDto)
                                                      .toList();

        List<MissionFilterResponseDto> missions = models.stream()
                                                        .map(Model::getMission)
                                                        .distinct()
                                                        .map(MissionFilterResponseDto::toDto)
                                                        .toList();

        List<DrivingTypeFilterResponseDto> drivingTypes = models.stream()
                                                                .map(Model::getDrivingType)
                                                                .distinct()
                                                                .map(DrivingTypeFilterResponseDto::toDto)
                                                                .toList();
        return ModelFilterResponseDto.builder()
                                     .engines(engines)
                                     .missions(missions)
                                     .drivingTypes(drivingTypes)
                                     .build();
    }

}
