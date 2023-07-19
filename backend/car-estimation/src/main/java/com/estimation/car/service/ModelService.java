package com.estimation.car.service;

import com.estimation.car.common.code.ErrorCode;
import com.estimation.car.common.exception.ModelNotFoundException;
import com.estimation.car.dto.response.exteriorcolor.ExteriorColorResponse;
import com.estimation.car.dto.response.interiorcolor.InteriorColorResponse;
import com.estimation.car.dto.response.model.ModelFilterResponse;
import com.estimation.car.dto.response.model.ModelOptionResponse;
import com.estimation.car.dto.response.model.ModelResponse;
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
import java.util.Comparator;
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
    private final SpecColorExtractor colorExtractor;

    public ModelFilterResponse filterModel(final int carId, final Integer engineId, final Integer missionId) {
        List<Model> models = modelRepository.filterModels(carId, engineId, missionId);
        if (models.isEmpty()) {
            throw new ModelNotFoundException(ErrorCode.MODEL_NOT_FOUND);
        }
        return ModelFilterResponse.from(models);
    }

    public List<ModelResponse> findTrims(final int carId, final int engineId, final int missionId, final int drivingTypeId) {
        List<Model> models = modelRepository.findTrims(carId, engineId, missionId, drivingTypeId);
        if (models.isEmpty()) {
            throw new ModelNotFoundException(ErrorCode.MODEL_NOT_FOUND);
        }
        return models.stream().map(ModelResponse::from).toList();
    }

    public ModelResponse findModel(final int modelId) {
        Model model = modelRepository.findById(modelId)
                              .orElseThrow(() -> new ModelNotFoundException(ErrorCode.MODEL_NOT_FOUND));
        return ModelResponse.from(model);
    }

    public List<ModelOptionResponse> findOptions(final int modelId) {
        List<SpecOption> options = specOptionRepository.findSpecOptionsBy(modelId, Optional.empty());

        Map<Spec, List<SpecOption>> groupedOptions = options.stream().collect(groupingBy(SpecOption::getSpec));
        List<ModelOptionResponse> response = new ArrayList<>();
        for (Spec spec : groupedOptions.keySet()) {
            response.add(ModelOptionResponse.from(spec, groupedOptions.get(spec)));
        }
        return response.stream().sorted(Comparator.comparing(ModelOptionResponse::getSpecCode)).toList();
    }

    public List<ExteriorColorResponse> findExteriorColors(final int modelId, final int interiorColorId) {
        Model model = modelRepository.findById(modelId)
                              .orElseThrow(() -> new ModelNotFoundException(ErrorCode.MODEL_NOT_FOUND));
        int carId = model.getCarId();

        List<SpecColor> exteriorSpecColors = specColorRepository.findExteriorColorsBy(carId);

        List<ExteriorColor> exteriorColors = colorExtractor.extract(exteriorSpecColors, SpecColor::getExteriorColor);

        Predicate<SpecColor> predicate = specColor -> specColor.getModelId() == modelId && specColor.getInteriorColorId() == interiorColorId;
        List<ExteriorColor> modelExteriorColors = colorExtractor.extractFilteredBy(exteriorSpecColors, predicate, SpecColor::getExteriorColor);

        return exteriorColors.stream()
                       .map(exteriorColor -> ExteriorColorResponse.from(exteriorColor, modelExteriorColors.contains(exteriorColor)))
                       .sorted(Comparator.comparing(ExteriorColorResponse::isChoiceYn).reversed())
                       .toList();
    }

    public List<InteriorColorResponse> findInteriorColors(final int modelId, final int exteriorColorId) {
        Model model = modelRepository.findById(modelId)
                              .orElseThrow(() -> new ModelNotFoundException(ErrorCode.MODEL_NOT_FOUND));
        int carId = model.getCarId();

        List<SpecColor> interiorSpecColors = specColorRepository.findInteriorColorsBy(carId);

        List<InteriorColor> interiorColors = colorExtractor.extract(interiorSpecColors, SpecColor::getInteriorColor);

        Predicate<SpecColor> predicate = specColor -> specColor.getModelId() == modelId && specColor.getExteriorColorId() == exteriorColorId;
        List<InteriorColor> modelInteriorColors = colorExtractor.extractFilteredBy(interiorSpecColors, predicate, SpecColor::getInteriorColor);

        return interiorColors.stream()
                       .map(interiorColor -> InteriorColorResponse.from(interiorColor, modelInteriorColors.contains(interiorColor)))
                       .sorted(Comparator.comparing(InteriorColorResponse::isChoiceYn).reversed())
                       .toList();
    }
}
