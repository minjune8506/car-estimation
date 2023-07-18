package com.estimation.car.dto.response.model;

import com.estimation.car.entity.Model;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class ModelResponse {
    private final int id;
    private final String trimName;
    private final String name;
    private final String basicInfo;
    private final int price;
    private final String imgPath;
    private final List<String> detailImgs;

    public static ModelResponse from(final Model model) {
        return ModelResponse.builder()
                .id(model.getId())
                .trimName(model.getTrimName())
                .name(model.getName())
                .basicInfo(model.getBasicInfo())
                .price(model.getPrice())
                .imgPath(model.getImgPath())
                .detailImgs(List.of(model.getModelDetail().getDetailImgPath1(), model.getModelDetail().getDetailImgPath2(), model.getModelDetail().getDetailImgPath3()))
                .build();
    }
}
