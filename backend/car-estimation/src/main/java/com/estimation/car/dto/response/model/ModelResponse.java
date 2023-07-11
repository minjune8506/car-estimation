package com.estimation.car.dto.response.model;

import com.estimation.car.entity.Model;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ModelResponse {
    private final String trimName;
    private final String name;
    private final String basicInfo;
    private final int price;
    private final String imgPath;

    public static ModelResponse from(Model model) {
        return ModelResponse.builder()
                            .trimName(model.getTrimName())
                            .name(model.getName())
                            .basicInfo(model.getBasicInfo())
                            .price(model.getPrice())
                            .imgPath(model.getImgPath())
                            .build();
    }
}
