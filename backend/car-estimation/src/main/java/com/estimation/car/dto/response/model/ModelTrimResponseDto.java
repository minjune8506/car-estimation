package com.estimation.car.dto.response.model;

import com.estimation.car.entity.Model;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class ModelTrimResponseDto {
    private final int id;
    private final String trimName;
    private final int price;
    private final String basicInfo;
    private final String modelImg;
    private final List<String> detailImgs;

    public static ModelTrimResponseDto from(final Model model) {
        return ModelTrimResponseDto.builder()
                                   .id(model.getId())
                                   .trimName(model.getTrimName())
                                   .price(model.getPrice())
                                   .basicInfo(model.getBasicInfo())
                                   .modelImg(model.getImgPath())
                                   .detailImgs(List.of(model.getDetailImgPath1(), model.getDetailImgPath2(), model.getDetailImgPath3()))
                                   .build();
    }
}
