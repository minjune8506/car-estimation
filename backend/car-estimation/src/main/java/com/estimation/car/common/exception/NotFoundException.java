package com.estimation.car.common.exception;

import com.estimation.car.common.code.ErrorCode;
import lombok.Getter;

@Getter
public class NotFoundException extends RuntimeException {
    private final ErrorCode errorCode;

    public NotFoundException(ErrorCode code) {
        super();
        this.errorCode = code;
    }
}
