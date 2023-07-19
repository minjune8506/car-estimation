package com.estimation.car.controller;

import com.estimation.car.common.code.Code;
import com.estimation.car.common.response.Response;
import com.estimation.car.dto.response.spec.CheckSpecResponse;
import com.estimation.car.dto.response.spec.SpecInfoResponse;
import com.estimation.car.dto.response.spec.option.constraints.ConstraintCheckResponse;
import com.estimation.car.dto.response.spec.option.constraints.SpecOptionConstraintResponse;
import com.estimation.car.service.SpecService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/specs")
public class SpecController {

    private final SpecService specService;

    @GetMapping()
    public ResponseEntity<Response<List<SpecInfoResponse>>> findAllSpec(@RequestParam int modelId) {
        List<SpecInfoResponse> result = specService.findAllSpecInfo(modelId);
        return ResponseEntity.ok(Response.of(Code.SUCCESS, result));
    }

    @GetMapping("/{specCode}")
    public ResponseEntity<Response<SpecInfoResponse>> findSpecInfo(@PathVariable char specCode,
                                                                   @RequestParam int modelId) {
        SpecInfoResponse result = specService.findSpecInfo(modelId, specCode);
        return ResponseEntity.ok(Response.of(Code.SUCCESS, result));
    }

    @GetMapping("/check")
    public ResponseEntity<Response<CheckSpecResponse>> checkSpec(@RequestParam int modelId,
                                                                 @RequestParam char specCode,
                                                                 @RequestParam int interiorColorId,
                                                                 @RequestParam int exteriorColorId) {
        CheckSpecResponse result = specService.checkSpec(modelId, specCode, exteriorColorId, interiorColorId);
        return ResponseEntity.ok(Response.of(Code.SUCCESS, result));
    }

    @GetMapping("/constraints/check")
    public ResponseEntity<Response<ConstraintCheckResponse>> checkConstraints(@RequestParam int modelId,
                                                                              @RequestParam List<Integer> selectedOptions,
                                                                              @RequestParam int targetOptionId) {
        ConstraintCheckResponse result = specService.checkSpecOptionConstraints(modelId, selectedOptions, targetOptionId);
        return ResponseEntity.ok(Response.of(Code.SUCCESS, result));
    }

    @GetMapping("/options/constraints")
    public ResponseEntity<Response<List<SpecOptionConstraintResponse>>> findOptionConstraints(@RequestParam int modelId,
                                                                                              @RequestParam List<Integer> selectedOptions) {
        List<SpecOptionConstraintResponse> result = specService.findSpecConstraints(modelId, selectedOptions);
        return ResponseEntity.ok(Response.of(Code.SUCCESS, result));
    }

    @GetMapping("/colors/change")
    public ResponseEntity<Response<?>> changeColor(@RequestParam int modelId,
                                                   @RequestParam int beforeExteriorColorId,
                                                   @RequestParam int beforeInteriorColorId,
                                                   @RequestParam int afterExteriorColorId,
                                                   @RequestParam int afterInteriorColorId,
                                                   @RequestParam List<Integer> options) {
        Object result = specService.changeColor(modelId, beforeExteriorColorId, beforeInteriorColorId, afterExteriorColorId, afterInteriorColorId, options);
        return ResponseEntity.ok(Response.of(Code.SUCCESS, result));
    }
}
