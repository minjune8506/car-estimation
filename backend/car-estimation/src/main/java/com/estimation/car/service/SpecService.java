package com.estimation.car.service;

import com.estimation.car.dto.response.spec.CheckSpecFailResponse;
import com.estimation.car.dto.response.spec.CheckSpecResponse;
import com.estimation.car.dto.response.spec.SpecInfoResponse;
import com.estimation.car.dto.response.spec.option.constraints.SpecOptionConstraintResponse;
import com.estimation.car.entity.Spec;
import com.estimation.car.entity.SpecColor;
import com.estimation.car.entity.SpecOption;
import com.estimation.car.entity.SpecOptionConstraint;
import com.estimation.car.repository.spec.color.SpecColorRepository;
import com.estimation.car.repository.spec.option.SpecOptionRepository;
import com.estimation.car.repository.spec.option.constraints.SpecOptionConstraintRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static java.util.stream.Collectors.groupingBy;

@RequiredArgsConstructor
@Service
public class SpecService {

    private final SpecOptionRepository specOptionRepository;
    private final SpecColorRepository specColorRepository;
    private final SpecOptionConstraintRepository specOptionConstraintRepository;

    public List<SpecInfoResponse> findAllSpecInfo(final int modelId) {
        List<SpecOption> specOptions = specOptionRepository.findSpecOptionsBy(modelId, Optional.empty());
        List<SpecColor> specColors = specColorRepository.findModelSpecColorsBy(modelId);

        Map<Spec, List<SpecOption>> groupedSpecOptions = specOptions.stream()
                                                                    .collect(groupingBy(SpecOption::getSpec));
        Map<Spec, List<SpecColor>> groupedSpecColors = specColors.stream()
                                                                 .collect(groupingBy(SpecColor::getSpec));

        List<SpecInfoResponse> result = new ArrayList<>();
        for (Spec spec : groupedSpecColors.keySet()) {
            result.add(SpecInfoResponse.from(spec, groupedSpecColors.get(spec), groupedSpecOptions.get(spec)));
        }
        return result;
    }

    public SpecInfoResponse findSpecInfo(final int modelId, final char specCode) {
        List<SpecOption> specOptions = specOptionRepository.findSpecOptionsBy(modelId, Optional.of(specCode));
        List<SpecColor> specColors = specColorRepository.findSpecColorsBy(modelId, specCode);

        if (specOptions.isEmpty()) {
            return null;
        }
        Spec spec = specOptions.get(0).getSpec();

        return SpecInfoResponse.from(spec, specColors, specOptions);
    }

    public CheckSpecResponse checkSpec(final int modelId, final char specCode, final int exteriorColorId, final int interiorColorId) {
        List<SpecColor> specColors = specColorRepository.findSpecColorsBy(modelId, exteriorColorId, interiorColorId);
        if (specColors.isEmpty()) {
            return null;
        }

        Optional<SpecColor> found = specColors.stream()
                                              .filter(specColor -> specColor.getSpecCode() == specCode)
                                              .findAny();

        return found.map(specColor -> CheckSpecResponse.from('Y'))
                    .orElseGet(() -> CheckSpecFailResponse.from(specColors.get(0), 'N'));
    }

    public List<SpecOptionConstraintResponse> findSpecConstraints(final int modelId, final char specCode, final int optionId) {
        List<SpecOptionConstraint> constraints = specOptionConstraintRepository.findConstraints(modelId, specCode, optionId);

        return constraints.stream().map(SpecOptionConstraintResponse::from).toList();
    }
}
