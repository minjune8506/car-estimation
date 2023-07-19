package com.estimation.car.common.code;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {

    SYSTEM_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, 1000, "시스템 에러입니다."),

    BAD_REQUEST(HttpStatus.BAD_REQUEST, 4000, "올바르지 않은 요청입니다."),
    MODEL_NOT_FOUND(HttpStatus.OK, 4001, "해당하는 모델을 찾을 수 없습니다."),
    CAR_NOT_FOUND(HttpStatus.NOT_FOUND, 4002, "해당하는 차량을 찾을 수 없습니다."),
    OPTION_NOT_FOUND(HttpStatus.NOT_FOUND, 4005, "해당하는 옵션을 찾을 수 없습니다.");

    private final HttpStatus status;
    private final int value;
    private final String message;

    ErrorCode(HttpStatus status, int value, String message) {
        this.status = status;
        this.value = value;
        this.message = message;
    }
}
