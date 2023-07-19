package com.estimation.car.common.exception;

import com.estimation.car.common.code.ErrorCode;

public class OptionNotFoundException extends CustomException {

    private static final String message = "해당하는 옵션을 찾을 수 없는 경우";

    public OptionNotFoundException() {
        super(ErrorCode.OPTION_NOT_FOUND, message);
    }
}
