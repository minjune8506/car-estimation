package com.estimation.car.service;

import com.estimation.car.common.code.ErrorCode;
import com.estimation.car.common.exception.ModelNotFoundException;
import com.estimation.car.dto.response.model.ModelFilterResponseDto;
import com.estimation.car.dto.response.model.ModelTrimResponseDto;
import com.estimation.car.entity.Model;
import com.estimation.car.repository.ModelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ModelService {

    private final ModelRepository modelRepository;

    public ModelFilterResponseDto filterModel(final int carId,
                                              final Optional<Integer> engineId,
                                              final Optional<Integer> missionId) {
        List<Model> models = modelRepository.filterModels(carId, engineId, missionId);

        if (models.isEmpty()) {
            throw new ModelNotFoundException(ErrorCode.NO_MODEL);
        }
        return ModelFilterResponseDto.toDto(models);
    }

    public List<ModelTrimResponseDto> findTrims(final int carId,
                                                final int engineId,
                                                final int missionId,
                                                final int drivingTypeId) {
        List<Model> models = modelRepository.findTrims(carId, engineId, missionId, drivingTypeId);

        if (models.isEmpty()) {
            throw new ModelNotFoundException(ErrorCode.NO_MODEL);
        }
        return models.stream()
                     .map(ModelTrimResponseDto::toDto)
                     .toList();
    }
}
