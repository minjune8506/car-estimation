package com.estimation.car.controller;

import com.estimation.car.common.code.Code;
import com.estimation.car.common.response.Response;
import com.estimation.car.dto.response.exteriorcolor.ExteriorColorResponse;
import com.estimation.car.dto.response.interiorcolor.InteriorColorResponse;
import com.estimation.car.dto.response.model.ModelFilterResponse;
import com.estimation.car.dto.response.model.ModelOptionResponse;
import com.estimation.car.dto.response.model.ModelResponse;
import com.estimation.car.service.ModelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/models")
@RequiredArgsConstructor
public class ModelController {
    private final ModelService modelService;

    @GetMapping("/filter")
    public ResponseEntity<Response<ModelFilterResponse>> filterModel(@RequestParam int carId,
                                                                     @RequestParam(value = "engineId", required = false) Integer engineId,
                                                                     @RequestParam(value = "missionId", required = false) Integer missionId) {
        ModelFilterResponse result = modelService.filterModel(carId, engineId, missionId);
        return ResponseEntity.ok().body(Response.of(Code.SUCCESS, result));
    }

    @GetMapping("/trims")
    public ResponseEntity<Response<List<ModelResponse>>> findTrims(@RequestParam int carId,
                                                                   @RequestParam int engineId,
                                                                   @RequestParam int missionId,
                                                                   @RequestParam int drivingTypeId) {
        List<ModelResponse> result = modelService.findTrims(carId, engineId, missionId, drivingTypeId);
        return ResponseEntity.ok().body(Response.of(Code.SUCCESS, result));
    }

    @GetMapping("/{modelId}")
    public ResponseEntity<Response<ModelResponse>> getModelInfo(@PathVariable int modelId) {
        ModelResponse result = modelService.findModel(modelId);
        return ResponseEntity.ok().body(Response.of(Code.SUCCESS, result));
    }

    @GetMapping("/{modelId}/options")
    public ResponseEntity<Response<List<ModelOptionResponse>>> findAllOptions(@PathVariable int modelId) {
        List<ModelOptionResponse> result = modelService.findOptions(modelId);
        return ResponseEntity.ok().body(Response.of(Code.SUCCESS, result));
    }

    @GetMapping("/{modelId}/colors/exteriors")
    public ResponseEntity<Response<List<ExteriorColorResponse>>> findExteriorColors(@PathVariable int modelId, @RequestParam int interiorColorId) {
        List<ExteriorColorResponse> result = modelService.findExteriorColors(modelId, interiorColorId);
        return ResponseEntity.ok().body(Response.of(Code.SUCCESS, result));
    }

    @GetMapping("/{modelId}/colors/interiors")
    public ResponseEntity<Response<List<InteriorColorResponse>>> findInteriorColors(@PathVariable int modelId, @RequestParam int exteriorColorId) {
        List<InteriorColorResponse> result = modelService.findInteriorColors(modelId, exteriorColorId);
        return ResponseEntity.ok().body(Response.of(Code.SUCCESS, result));
    }
}
