package com.estimation.car.service;

import com.estimation.car.common.code.ErrorCode;
import com.estimation.car.common.exception.ModelNotFoundException;
import com.estimation.car.dto.response.exteriorcolor.ExteriorColorResponse;
import com.estimation.car.dto.response.interiorcolor.InteriorColorResponse;
import com.estimation.car.dto.response.model.ModelFilterResponseDto;
import com.estimation.car.dto.response.model.ModelOptionResponse;
import com.estimation.car.dto.response.model.ModelResponse;
import com.estimation.car.dto.response.model.ModelTrimResponseDto;
import com.estimation.car.entity.ExteriorColor;
import com.estimation.car.entity.InteriorColor;
import com.estimation.car.entity.Model;
import com.estimation.car.entity.Spec;
import com.estimation.car.entity.SpecColor;
import com.estimation.car.entity.SpecOption;
import com.estimation.car.repository.model.ModelRepository;
import com.estimation.car.repository.spec.color.SpecColorRepository;
import com.estimation.car.repository.spec.option.SpecOptionRepository;
import com.estimation.car.service.support.SpecColorExtractor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Predicate;

import static java.util.stream.Collectors.groupingBy;

@RequiredArgsConstructor
@Service
public class ModelService {

    private final ModelRepository modelRepository;
    private final SpecOptionRepository specOptionRepository;
    private final SpecColorRepository specColorRepository;

    public ModelFilterResponseDto filterModel(final int carId, final Optional<Integer> engineId, final Optional<Integer> missionId) {
        List<Model> models = modelRepository.filterModels(carId, engineId, missionId);

        if (models.isEmpty()) {
            throw new ModelNotFoundException(ErrorCode.NO_MODEL);
        }
        return ModelFilterResponseDto.from(models);
    }

    public List<ModelTrimResponseDto> findTrims(final int carId, final int engineId, final int missionId, final int drivingTypeId) {
        List<Model> models = modelRepository.findTrims(carId, engineId, missionId, drivingTypeId);

        if (models.isEmpty()) {
            throw new ModelNotFoundException(ErrorCode.NO_MODEL);
        }
        return models.stream().map(ModelTrimResponseDto::from).toList();
    }

    public ModelResponse findModel(int modelId) {
        Model model = modelRepository.findById(modelId)
                                     .orElseThrow(() -> new ModelNotFoundException(ErrorCode.NO_MODEL));
        return ModelResponse.from(model);
    }

    public List<ModelOptionResponse> findOptions(int modelId) {
        List<SpecOption> options = specOptionRepository.findSpecOptionsBy(modelId, Optional.empty());

        Map<Spec, List<SpecOption>> groupedOptions = options.stream().collect(groupingBy(SpecOption::getSpec));
        List<ModelOptionResponse> response = new ArrayList<>();
        for (Spec spec : groupedOptions.keySet()) {
            response.add(ModelOptionResponse.from(spec, groupedOptions.get(spec)));
        }
        return response;
    }

    public List<ExteriorColorResponse> findExteriorColors(int modelId, int interiorColorId) {
        Model model = modelRepository.findById(modelId)
                                     .orElseThrow(() -> new ModelNotFoundException(ErrorCode.NO_MODEL));
        int carId = model.getCarId();

        List<SpecColor> exteriorSpecColors = specColorRepository.findExteriorColorsBy(carId);

        SpecColorExtractor extractor = new SpecColorExtractor(exteriorSpecColors);

        List<ExteriorColor> exteriorColors = extractor.extract(SpecColor::getExteriorColor);

        Predicate<SpecColor> predicate = specColor -> specColor.getModelId() == modelId && specColor.getInteriorColorId() == interiorColorId;
        List<ExteriorColor> modelExteriorColors = extractor.extractFilteredBy(predicate, SpecColor::getExteriorColor);

        return exteriorColors.stream()
                             .map(exteriorColor -> ExteriorColorResponse.from(exteriorColor, modelExteriorColors.contains(exteriorColor)))
                             .toList();
    }

    public List<InteriorColorResponse> findInteriorColors(int modelId, int exteriorColorId) {
        Model model = modelRepository.findById(modelId)
                                     .orElseThrow(() -> new ModelNotFoundException(ErrorCode.NO_MODEL));
        int carId = model.getCarId();

        List<SpecColor> interiorSpecColors = specColorRepository.findInteriorColorsBy(carId);
        SpecColorExtractor extractor = new SpecColorExtractor(interiorSpecColors);

        List<InteriorColor> interiorColors = extractor.extract(SpecColor::getInteriorColor);

        Predicate<SpecColor> predicate = specColor -> specColor.getModelId() == modelId && specColor.getExteriorColorId() == exteriorColorId;
        List<InteriorColor> modelInteriorColors = extractor.extractFilteredBy(predicate, SpecColor::getInteriorColor);

        return interiorColors.stream()
                             .map(interiorColor -> InteriorColorResponse.from(interiorColor, modelInteriorColors.contains(interiorColor)))
                             .toList();
    }
}
