package com.estimation.car.common.response;

import com.estimation.car.common.code.ErrorCode;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@Builder
@RequiredArgsConstructor
public class ErrorResponse {
    private final Integer code;
    private final String message;

    public static ErrorResponse of(ErrorCode code) {
        return ErrorResponse.builder()
                            .code(code.getValue())
                            .message(code.getMessage())
                            .build();
    }
}
