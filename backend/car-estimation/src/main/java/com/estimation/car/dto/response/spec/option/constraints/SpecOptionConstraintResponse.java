package com.estimation.car.dto.response.spec.option.constraints;

import com.estimation.car.dto.response.spec.option.SpecOptionResponse;
import com.estimation.car.entity.SpecOptionConstraint;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class SpecOptionConstraintResponse {
    private SpecOptionResponse option;
    private char specCode;
    private String action;

    public static SpecOptionConstraintResponse from(SpecOptionConstraint specOptionConstraint) {
        return SpecOptionConstraintResponse.builder()
                .option(SpecOptionResponse.from(specOptionConstraint.getTarget()))
                .action(specOptionConstraint.getAction())
                .specCode(specOptionConstraint.getTarget().getSpec().getSpecCode())
                .build();
    }
}
