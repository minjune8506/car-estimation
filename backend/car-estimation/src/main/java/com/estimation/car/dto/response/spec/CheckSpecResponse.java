package com.estimation.car.dto.response.spec;

import lombok.Getter;

@Getter
public class CheckSpecResponse {
    private final char available;

    public CheckSpecResponse(final char available) {
        this.available = available;
    }

    public static CheckSpecResponse from(char available) {
        return new CheckSpecResponse(available);
    }
}
