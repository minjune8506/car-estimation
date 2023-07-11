package com.estimation.car.dto.response.spec;

import com.estimation.car.entity.SpecColor;
import lombok.Getter;

@Getter
public class CheckSpecFailResponse extends CheckSpecResponse {
    private final char specCode;
    private final int exteriorColorId;
    private final int interiorColorId;

    public CheckSpecFailResponse(final char available, final char specCode, final int exteriorColorId, final int interiorColorId) {
        super(available);
        this.specCode = specCode;
        this.exteriorColorId = exteriorColorId;
        this.interiorColorId = interiorColorId;
    }

    public static CheckSpecFailResponse from(SpecColor specColor, char available) {
        return new CheckSpecFailResponse(
                available,
                specColor.getSpec().getSpecCode(),
                specColor.getExteriorColor().getId(),
                specColor.getInteriorColor().getId());
    }
}
