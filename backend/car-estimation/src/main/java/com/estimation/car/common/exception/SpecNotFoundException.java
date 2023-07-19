package com.estimation.car.common.exception;

import com.estimation.car.common.code.ErrorCode;

public class SpecNotFoundException extends CustomException {

    private static final String message = "해당하는 스펙을 찾을 수 없는 경우";

    public SpecNotFoundException(final ErrorCode errorCode) {
        super(errorCode, message);
    }
}
