package com.estimation.car.common.code;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {
    CAR_NOT_FOUND(HttpStatus.NOT_FOUND, 404, "해당하는 차량을 찾을 수 없습니다.");;

    private final HttpStatus status;
    private final int value;
    private final String message;

    // default: private
    ErrorCode(HttpStatus status, int value, String message) {
        this.status = status;
        this.value = value;
        this.message = message;
    }
}
