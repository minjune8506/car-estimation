package com.estimation.car.common.response;

import com.estimation.car.common.code.Code;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class Response<T> {
    private final int code;
    private final String message;
    private final T data;

    public static Response<Void> of(Code code) {
        return Response.<Void>builder()
                       .code(code.getValue())
                       .message(code.getMessage())
                       .build();
    }

    public static <T> Response<T> of(Code code, T data) {
        return Response.<T>builder()
                       .code(code.getValue())
                       .message(code.getMessage())
                       .data(data)
                       .build();
    }
}
