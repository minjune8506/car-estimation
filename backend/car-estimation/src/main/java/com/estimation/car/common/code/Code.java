package com.estimation.car.common.code;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum Code {
    SUCCESS(HttpStatus.OK, 0, "성공");

    private final HttpStatus status;
    private final int value;
    private final String message;

    // default: private
    Code(HttpStatus status, int value, String message) {
        this.status = status;
        this.value = value;
        this.message = message;
    }
}
