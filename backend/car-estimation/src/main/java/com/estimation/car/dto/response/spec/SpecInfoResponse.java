package com.estimation.car.dto.response.spec;

import com.estimation.car.dto.response.spec.color.SpecColorResponse;
import com.estimation.car.dto.response.spec.option.SpecOptionResponse;
import com.estimation.car.entity.Spec;
import com.estimation.car.entity.SpecColor;
import com.estimation.car.entity.SpecOption;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class SpecInfoResponse {
    private final int specId;
    private final char specCode;
    private final List<SpecColorResponse> colors;
    private final List<SpecOptionResponse> options;

    public static SpecInfoResponse from(Spec spec, List<SpecColor> colors, List<SpecOption> options) {
        List<SpecColorResponse> colorResponses = colors.stream()
                                                       .map(SpecColorResponse::from)
                                                       .toList();
        List<SpecOptionResponse> optionResponses = options.stream().map(SpecOptionResponse::from).toList();

        return SpecInfoResponse.builder()
                               .specId(spec.getId())
                               .specCode(spec.getSpecCode())
                               .colors(colorResponses)
                               .options(optionResponses)
                               .build();
    }
}
