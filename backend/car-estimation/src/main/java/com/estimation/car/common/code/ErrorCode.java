package com.estimation.car.common.code;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {

    // 1xxx
    SYSTEM_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, 1000, "시스템 에러입니다."),

    // 4xxx
    CAR_NOT_FOUND(HttpStatus.NOT_FOUND, 4000, "해당하는 차량을 찾을 수 없습니다."),
    MISSING_PARAMS(HttpStatus.BAD_REQUEST, 4001, "올바르지 않은 요청입니다.");


    private final HttpStatus status;
    private final int value;
    private final String message;

    // default : private
    ErrorCode(HttpStatus status, int value, String message) {
        this.status = status;
        this.value = value;
        this.message = message;
    }
}
