package com.estimation.car.common.exception;

import com.estimation.car.common.code.ErrorCode;

public class CarNotFoundException extends CustomException {

    private static final String message = "해당하는 차량을 찾을 수 없는 경우";

    public CarNotFoundException(final ErrorCode errorCode) {
        super(errorCode, message);
    }
}
