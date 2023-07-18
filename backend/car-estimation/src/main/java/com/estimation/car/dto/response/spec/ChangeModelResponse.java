package com.estimation.car.dto.response.spec;

import com.estimation.car.dto.response.exteriorcolor.ExteriorColorResponse;
import com.estimation.car.dto.response.interiorcolor.InteriorColorResponse;
import com.estimation.car.dto.response.model.ModelResponse;
import com.estimation.car.dto.response.spec.option.SpecOptionResponse;
import com.estimation.car.entity.ExteriorColor;
import com.estimation.car.entity.InteriorColor;
import com.estimation.car.entity.Model;
import com.estimation.car.entity.SpecOption;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class ChangeModelResponse {
    private ModelResponse modelInfo;
    private ExteriorColorResponse exteriorColor;
    private InteriorColorResponse interiorColor;
    private List<SpecOptionResponse> delOptions;
    private List<SpecOptionResponse> addOptions;

    public static ChangeModelResponse from(Model model, ExteriorColor exteriorColor, InteriorColor interiorColor, List<SpecOption> delOptions, List<SpecOption> addOptions) {
        return ChangeModelResponse.builder()
                       .modelInfo(ModelResponse.from(model))
                       .exteriorColor(ExteriorColorResponse.from(exteriorColor, true))
                       .interiorColor(InteriorColorResponse.from(interiorColor, true))
                       .delOptions(delOptions.stream().map(SpecOptionResponse::from).toList())
                       .addOptions(addOptions.stream().map(SpecOptionResponse::from).toList())
                       .build();
    }
}
