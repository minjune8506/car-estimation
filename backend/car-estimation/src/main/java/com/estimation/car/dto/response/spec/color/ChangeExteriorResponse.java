package com.estimation.car.dto.response.spec.color;

import lombok.Getter;

@Getter
public class ChangeExteriorResponse extends ChangeColorResponse {
    private final char changeExteriorYn;

    public ChangeExteriorResponse() {
        this.changeExteriorYn = 'Y';
    }
}
