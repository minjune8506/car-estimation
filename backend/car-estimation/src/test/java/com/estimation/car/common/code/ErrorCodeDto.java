package com.estimation.car.common.code;

public class ErrorCodeDto {
    private final int status;
    private final int value;
    private final String message;

    public ErrorCodeDto(ErrorCode errorCode) {
        this.status = errorCode.getStatus().value();
        this.value = errorCode.getValue();
        this.message = errorCode.getMessage();
    }

    public int getStatus() {
        return status;
    }

    public int getValue() {
        return value;
    }

    public String getMessage() {
        return message;
    }


}
