package com.estimation.car.common.exception;

import com.estimation.car.common.code.ErrorCode;
import com.estimation.car.common.response.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

@RestControllerAdvice
@Slf4j
public class GlobalControllerAdvice {

    @ExceptionHandler
    public ResponseEntity<ErrorResponse> handleGlobalError(Exception e) {
        return ResponseEntity.status(ErrorCode.SYSTEM_ERROR.getStatus())
                       .body(ErrorResponse.of(ErrorCode.SYSTEM_ERROR));
    }

    @ExceptionHandler({MissingServletRequestParameterException.class, MethodArgumentTypeMismatchException.class})
    public ResponseEntity<ErrorResponse> handleMissionParams(Exception ex) {
        return ResponseEntity.status(ErrorCode.BAD_REQUEST.getStatus())
                       .body(ErrorResponse.of(ErrorCode.BAD_REQUEST));
    }

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ErrorResponse> handleCustomException(CustomException ex) {
        return ResponseEntity.status(ex.getErrorCode().getStatus())
                       .body(ErrorResponse.of(ex.getErrorCode()));
    }
}
