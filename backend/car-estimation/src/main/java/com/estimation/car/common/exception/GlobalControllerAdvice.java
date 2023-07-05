package com.estimation.car.common.exception;

import com.estimation.car.common.code.ErrorCode;
import com.estimation.car.common.response.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice()
@Slf4j
public class GlobalControllerAdvice {

    @ExceptionHandler()
    public ResponseEntity<ErrorResponse> handleGlobalError(Exception e) {
        log.error(e.getMessage());
        return ResponseEntity.status(ErrorCode.SYSTEM_ERROR.getStatus())
                             .body(ErrorResponse.of(ErrorCode.SYSTEM_ERROR));
    }

    @ExceptionHandler()
    public ResponseEntity<ErrorResponse> handleMissionParams(MissingServletRequestParameterException ex) {
        log.error(ex.getMessage());
        return ResponseEntity.status(ErrorCode.MISSING_PARAMS.getStatus())
                             .body(ErrorResponse.of(ErrorCode.MISSING_PARAMS));
    }
}
