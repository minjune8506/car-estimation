package com.estimation.car.common.code;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/codes")
public class ErrorCodeController {

    @GetMapping("/error")
    public Map<String, ErrorCodeDto> getAllErrorCodes() {
        Map<String, ErrorCodeDto> map = new HashMap<>();

        for (ErrorCode code : ErrorCode.values()) {
            map.put(code.getStatus().getReasonPhrase(), new ErrorCodeDto(code));
        }
        return map;
    }
}
