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

    public static ModelTrimResponseDto toDto(Model model) {

        return ModelTrimResponseDto.builder()
                                   .id(model.getId())
                                   .trimName(model.getTrimName())
                                   .price(model.getPrice())
                                   .basicInfo(model.getBasicInfo())
                                   .modelImg(model.getModelImg())
                                   .detailImgs(List.of(model.getModelDetailImg1(), model.getModelDetailImg2(), model.getModelDetailImg3()))
                                   .build();
    }
}
