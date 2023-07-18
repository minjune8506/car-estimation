package com.estimation.car.dto.response.spec.option.constraints;

import com.estimation.car.dto.response.spec.option.SpecOptionResponse;
import com.estimation.car.entity.SpecOption;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class ConstraintCheckResponse {
    List<SpecOptionResponse> delOptions;
    List<SpecOptionResponse> addOptions;

    public static ConstraintCheckResponse from(List<SpecOption> delOptions, List<SpecOption> addOptions) {
        return ConstraintCheckResponse.builder()
                       .delOptions(delOptions.stream().map(SpecOptionResponse::from).toList())
                       .addOptions(addOptions.stream().map(SpecOptionResponse::from).toList())
                       .build();
    }
}
