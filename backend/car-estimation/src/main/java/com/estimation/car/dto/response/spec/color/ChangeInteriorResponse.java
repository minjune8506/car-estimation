package com.estimation.car.dto.response.spec.color;

import lombok.Getter;

@Getter
public class ChangeInteriorResponse extends ChangeColorResponse {
    private final char changeInteriorYn;

    public ChangeInteriorResponse() {
        this.changeInteriorYn = 'Y';
    }
}
