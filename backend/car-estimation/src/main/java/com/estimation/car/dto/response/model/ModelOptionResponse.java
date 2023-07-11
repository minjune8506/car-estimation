package com.estimation.car.dto.response.model;

import com.estimation.car.dto.response.spec.option.SpecOptionResponse;
import com.estimation.car.entity.Spec;
import com.estimation.car.entity.SpecOption;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class ModelOptionResponse {
    private final char specCode;
    private final List<SpecOptionResponse> options;

    public static ModelOptionResponse from(Spec spec, List<SpecOption> options) {
        return ModelOptionResponse.builder()
                                  .specCode(spec.getSpecCode())
                                  .options(options.stream().map(SpecOptionResponse::from).toList())
                                  .build();
    }
}
