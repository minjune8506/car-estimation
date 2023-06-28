package com.estimation.car.common.response;

import com.estimation.car.common.code.ErrorCode;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@Builder
@RequiredArgsConstructor
public class ErrorResponse<T> {
    private final Integer code;
    private final String message;
    private final T data;

    public static ErrorResponse <Void> of(ErrorCode code) {
        return ErrorResponse.<Void>builder()
                       .code(code.getValue())
                       .message(code.getMessage())
                       .build();
    }

    public static <T> ErrorResponse<T> of(ErrorCode code, T data) {
        return ErrorResponse.<T>builder()
                       .code(code.getValue())
                       .message(code.getMessage())
                       .data(data)
                       .build();
    }
}
