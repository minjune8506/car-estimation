package com.estimation.car.common.exception;

import com.estimation.car.common.response.ErrorResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionAdvice {
    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ErrorResponse<Void>> handleNotFoundError(NotFoundException e) {
        return ResponseEntity.status(e.getErrorCode().getStatus())
                             .body(ErrorResponse.of(e.getErrorCode()));
    }
}
