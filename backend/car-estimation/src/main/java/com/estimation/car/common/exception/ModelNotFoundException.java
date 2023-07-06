package com.estimation.car.common.exception;

import com.estimation.car.common.code.ErrorCode;

public class ModelNotFoundException extends CustomException {
    private static final String message = "해당하는 모델을 찾을 수 없는 경우";

    public ModelNotFoundException(final ErrorCode errorCode) {
        super(errorCode, message);
    }
}
