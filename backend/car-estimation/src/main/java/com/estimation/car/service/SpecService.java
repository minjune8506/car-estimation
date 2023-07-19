package com.estimation.car.service;

import com.estimation.car.common.code.ErrorCode;
import com.estimation.car.common.exception.OptionNotFoundException;
import com.estimation.car.common.exception.SpecNotFoundException;
import com.estimation.car.dto.response.spec.ChangeModelResponse;
import com.estimation.car.dto.response.spec.CheckSpecFailResponse;
import com.estimation.car.dto.response.spec.CheckSpecResponse;
import com.estimation.car.dto.response.spec.SpecInfoResponse;
import com.estimation.car.dto.response.spec.color.ChangeExteriorResponse;
import com.estimation.car.dto.response.spec.color.ChangeInteriorResponse;
import com.estimation.car.dto.response.spec.option.constraints.ConstraintCheckResponse;
import com.estimation.car.dto.response.spec.option.constraints.SpecOptionConstraintResponse;
import com.estimation.car.entity.*;
import com.estimation.car.repository.spec.color.SpecColorRepository;
import com.estimation.car.repository.spec.option.SpecOptionRepository;
import com.estimation.car.repository.spec.option.constraints.SpecOptionConstraintRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

import static java.util.stream.Collectors.groupingBy;

@RequiredArgsConstructor
@Service
public class SpecService {
    private static final int FIRST = 0;
    private static final int PACKAGE_OPTION_CATEGORY = 10;

    private final SpecOptionRepository specOptionRepository;
    private final SpecColorRepository specColorRepository;
    private final SpecOptionConstraintRepository specOptionConstraintRepository;

    public List<SpecInfoResponse> findModelSpecs(final int modelId) {
        List<SpecOption> specOptions = specOptionRepository.findSpecOptionsBy(modelId, Optional.empty());
        List<SpecColor> specColors = specColorRepository.findModelSpecColorsBy(modelId);

        Map<Spec, List<SpecOption>> groupedSpecOptions = specOptions.stream().collect(groupingBy(SpecOption::getSpec));
        Map<Spec, List<SpecColor>> groupedSpecColors = specColors.stream().collect(groupingBy(SpecColor::getSpec));

        List<SpecInfoResponse> result = new ArrayList<>();
        for (Spec spec : groupedSpecOptions.keySet()) {
            result.add(SpecInfoResponse.from(spec, groupedSpecColors.get(spec), groupedSpecOptions.get(spec)));
        }
        result = result.stream().sorted(Comparator.comparing(SpecInfoResponse::getSpecCode)).toList();
        if (result.isEmpty()) {
            throw new SpecNotFoundException(ErrorCode.SPEC_NOT_FOUND);
        }
        return result;
    }

    public SpecInfoResponse findSpec(final int modelId, final char specCode) {
        List<SpecOption> specOptions = specOptionRepository.findSpecOptionsBy(modelId, Optional.of(specCode));
        List<SpecColor> specColors = specColorRepository.findSpecColorsBy(modelId, specCode);

        if (specOptions.isEmpty() || specColors.isEmpty()) {
            throw new SpecNotFoundException(ErrorCode.SPEC_NOT_FOUND);
        }

        Spec spec = specOptions.get(FIRST).getSpec();
        return SpecInfoResponse.from(spec, specColors, specOptions);
    }

    public CheckSpecResponse checkColor(final int modelId, final char specCode, final int exteriorColorId, final int interiorColorId) {
        List<SpecColor> specColors = specColorRepository.findSpecColorsBy(modelId, exteriorColorId, interiorColorId);
        if (specColors.isEmpty()) {
            throw new IllegalArgumentException("잘못된 요청입니다.");
        }

        Optional<SpecColor> found = specColors.stream()
                                            .filter(specColor -> specColor.getSpecCode() == specCode)
                                            .findAny();
        return found.map(specColor -> CheckSpecResponse.from('Y'))
                       .orElseGet(() -> CheckSpecFailResponse.from(specColors.get(FIRST), 'N'));
    }

    public List<SpecOptionConstraintResponse> findOptionConstraints(final int modelId, final List<Integer> selectedOptions) {
        List<SpecOptionConstraint> constraints = specOptionConstraintRepository.findConstraintsBy(modelId, selectedOptions);
        return constraints.stream()
                       .map(SpecOptionConstraintResponse::from)
                       .toList();
    }

    public Object changeColor(int modelId,
                              int beforeExteriorColorId,
                              int beforeInteriorColorId,
                              int afterExteriorColorId,
                              int afterInteriorColorId,
                              List<Integer> options) {
        List<SpecColor> specColors = specColorRepository.findSpecColorsToChangeBy(modelId);

        List<SpecColor> modelColors = specColors.stream()
                                              .filter(specColor -> specColor.getModelId() == modelId)
                                              .toList();

        Optional<SpecColor> canChoice = modelColors.stream().filter(specColor -> specColor.getExteriorColorId() == afterExteriorColorId && specColor.getInteriorColorId() == afterInteriorColorId)
                                                .findAny();
        if (canChoice.isPresent()) {
            throw new IllegalArgumentException("모델에서 선택할수 없는 색상인 경우에 호출 가능합니다.");
        }

        // 내장 색상만 변경한 경우 + 모델에서 선택할 수 있는 내장 색상인 경우
        if (beforeExteriorColorId == afterExteriorColorId) {
            Optional<SpecColor> possibleInterior = modelColors.stream()
                                                           .filter(specColor -> specColor.getInteriorColorId() == afterInteriorColorId)
                                                           .findAny();
            if (possibleInterior.isPresent()) {
                return new ChangeExteriorResponse();
            }
        }

        // 외장 색상만 변경한 경우 + 모델에서 선택할 수 있는 외장 색상인 경우
        if (beforeInteriorColorId == afterInteriorColorId) {
            Optional<SpecColor> possibleExterior = modelColors.stream()
                                                           .filter(specColor -> specColor.getExteriorColorId() == afterExteriorColorId)
                                                           .findAny();
            if (possibleExterior.isPresent()) {
                return new ChangeInteriorResponse();
            }
        }

        // 모델에서 선택할 수 없는 색상인 경우 -> 모델 변경
        return changeModel(modelId, afterExteriorColorId, afterInteriorColorId, options, specColors);
    }

    private ChangeModelResponse changeModel(int modelId, int afterExteriorColorId, int afterInteriorColorId, List<Integer> options, List<SpecColor> specColors) {
        List<SpecColor> possibleOtherModelsColor = specColors.stream()
                                                           .filter(specColor -> specColor.getInteriorColorId() == afterInteriorColorId)
                                                           .toList();
        if (possibleOtherModelsColor.isEmpty()) {
            throw new IllegalArgumentException("잘못된 색상 조합입니다.");
        }

        Spec targetSpec = possibleOtherModelsColor.get(FIRST).getSpec();
        Model targetModel = targetSpec.getModel();
        int targetModelId = targetModel.getId();
        char targetSpecCode = targetSpec.getSpecCode();

        List<SpecColor> availableColors = possibleOtherModelsColor.stream()
                                                  .filter(specColor -> specColor.getModelId() == targetModelId && specColor.getSpecCode() == targetSpecCode)
                                                  .toList();

        Optional<SpecColor> canKeepExterior = availableColors.stream()
                                                      .filter(specColor -> specColor.getExteriorColorId() == afterExteriorColorId
                                                                                   && specColor.getInteriorColorId() == afterInteriorColorId)
                                                      .findFirst();
        ExteriorColor exteriorColor = canKeepExterior.map(SpecColor::getExteriorColor)
                                              .orElseGet(() -> availableColors.get(FIRST).getExteriorColor());
        InteriorColor interiorColor = canKeepExterior.map(SpecColor::getInteriorColor)
                                              .orElseGet(() -> availableColors.get(FIRST).getInteriorColor());

        List<SpecOption> modelOptions = specOptionRepository.findSpecOptionsBy(targetModelId, Optional.empty());
        List<SpecOption> delOptions = filterOptionsToDelete(modelId, options, modelOptions);
        List<SpecOption> addOptions = filterOptionsToAdd(targetSpecCode, modelOptions);
        return ChangeModelResponse.from(targetModel, exteriorColor, interiorColor, delOptions, addOptions);
    }

    private List<SpecOption> filterOptionsToAdd(char targetModelSpec, List<SpecOption> modelOptions) {
        return modelOptions.stream()
                       .filter(modelOption -> modelOption.getSpecCode() == targetModelSpec && modelOption.getDefaultYn() == 'Y')
                       .toList();
    }

    private List<SpecOption> filterOptionsToDelete(int modelId, List<Integer> options, List<SpecOption> modelOptions) {
        List<Integer> modelOptionsId = modelOptions.stream()
                                               .filter(specOption -> specOption.getOptionCategoryId() == PACKAGE_OPTION_CATEGORY)
                                               .map(SpecOption::getOptionId)
                                               .toList();
        List<Integer> delOptionsId = options.stream()
                                             .filter(option -> !modelOptionsId.contains(option))
                                             .toList();
        return specOptionRepository.findSpecOptionsBy(modelId, delOptionsId);
    }

    public ConstraintCheckResponse checkOptionConstraints(int modelId, List<Integer> selectedOptions, int targetOptionId) {
        List<SpecOption> targetOption = specOptionRepository.findSpecOptionsBy(modelId, List.of(targetOptionId));
        if (targetOption.size() != 1) {
            throw new OptionNotFoundException(ErrorCode.OPTION_NOT_FOUND);
        }

        List<SpecOptionConstraint> constraints = specOptionConstraintRepository.findConstraintsBy(modelId, targetOptionId);

        List<SpecOption> delOptions = constraints.stream().filter(specOptionConstraint -> specOptionConstraint.getAction().equals("DISABLE"))
                                              .map(SpecOptionConstraint::getSource)
                                              .filter(specOption -> selectedOptions.contains(specOption.getOptionId()))
                                              .toList();
        List<SpecOption> addOptions = new ArrayList<>();
        addOptions.addAll(targetOption);
        addOptions.addAll(constraints.stream().filter(specOptionConstraint -> specOptionConstraint.getAction().equals("ENABLE"))
                                  .map(SpecOptionConstraint::getSource)
                                  .filter(option -> !selectedOptions.contains(option.getId()))
                                  .toList());
        return ConstraintCheckResponse.from(delOptions, addOptions);
    }
}
