package com.estimation.car.controller;

import com.estimation.car.common.code.Code;
import com.estimation.car.common.response.Response;
import com.estimation.car.dto.response.model.ModelFilterResponseDto;
import com.estimation.car.dto.response.model.ModelTrimResponseDto;
import com.estimation.car.service.ModelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/models")
@RequiredArgsConstructor
public class ModelController {
    private final ModelService modelService;

    @GetMapping("/filter")
    public ResponseEntity<Response<ModelFilterResponseDto>> filterModel(@RequestParam("carId") int carId,
                                                                        @RequestParam(value = "engineId", required = false) Optional<Integer> engineId,
                                                                        @RequestParam(value = "missionId", required = false) Optional<Integer> missionId) {
        ModelFilterResponseDto result = modelService.filterModel(carId, engineId, missionId);
        return ResponseEntity.ok()
                             .body(Response.of(Code.SUCCESS, result));
    }

    @GetMapping("/trims")
    public ResponseEntity<Response<List<ModelTrimResponseDto>>> findTrims(@RequestParam("carId") int carId,
                                                                          @RequestParam(value = "engineId") int engineId,
                                                                          @RequestParam(value = "missionId") int missionId,
                                                                          @RequestParam(value = "drivingTypeId") int drivingTypeId) {
        List<ModelTrimResponseDto> result = modelService.findTrims(carId, engineId, missionId, drivingTypeId);
        return ResponseEntity.ok()
                             .body(Response.of(Code.SUCCESS, result));

    }
}
