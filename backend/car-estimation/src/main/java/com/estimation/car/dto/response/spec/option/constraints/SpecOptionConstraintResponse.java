package com.estimation.car.dto.response.spec.option.constraints;

import com.estimation.car.entity.SpecOptionConstraint;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class SpecOptionConstraintResponse {
    private int optionId;
    private String optionName;
    private String action;

    public static SpecOptionConstraintResponse from(SpecOptionConstraint specOptionConstraint) {
        return SpecOptionConstraintResponse.builder()
                                           .optionId(specOptionConstraint.getTarget().getOption().getId())
                                           .optionName(specOptionConstraint.getTarget().getOption().getName())
                                           .action(specOptionConstraint.getAction())
                                           .build();
    }
}
