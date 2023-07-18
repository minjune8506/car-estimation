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
    public ResponseEntity<Response<List<SpecInfoResponse>>> findAllSpec(@RequestParam("modelId") int modelId) {
        List<SpecInfoResponse> result = specService.findAllSpecInfo(modelId);
        return ResponseEntity.ok(Response.of(Code.SUCCESS, result));
    }

    @GetMapping("/{specCode}")
    public ResponseEntity<Response<SpecInfoResponse>> findSpecInfo(@PathVariable("specCode") char specCode,
                                                                   @RequestParam("modelId") int modelId) {
        SpecInfoResponse result = specService.findSpecInfo(modelId, specCode);
        return ResponseEntity.ok(Response.of(Code.SUCCESS, result));
    }

    @GetMapping("/check")
    public ResponseEntity<Response<CheckSpecResponse>> checkSpec(@RequestParam("modelId") int modelId,
                                                                 @RequestParam("specCode") char specCode,
                                                                 @RequestParam("interiorColorId") int interiorColorId,
                                                                 @RequestParam("exteriorColorId") int exteriorColorId) {
        CheckSpecResponse result = specService.checkSpec(modelId, specCode, exteriorColorId, interiorColorId);
        return ResponseEntity.ok(Response.of(Code.SUCCESS, result));
    }

    @GetMapping("/constraints/check")
    public ResponseEntity<Response<ConstraintCheckResponse>> checkConstraints(@RequestParam("modelId") int modelId,
                                                                              @RequestParam("selectedOptions") List<Integer> selectedOptions,
                                                                              @RequestParam("targetOptionId") int targetOptionId) {
        ConstraintCheckResponse result = specService.checkSpecOptionConstraints(modelId, selectedOptions, targetOptionId);
        return ResponseEntity.ok(Response.of(Code.SUCCESS, result));
    }

    @GetMapping("/options/constraints")
    public ResponseEntity<Response<List<SpecOptionConstraintResponse>>> findOptionConstraints(@RequestParam("modelId") int modelId,
                                                                                              @RequestParam("selectedOptions") List<Integer> selectedOptions) {
        List<SpecOptionConstraintResponse> result = specService.findSpecConstraints(modelId, selectedOptions);
        return ResponseEntity.ok(Response.of(Code.SUCCESS, result));
    }

    @GetMapping("/colors/change")
    public ResponseEntity<Response<?>> changeColor(@RequestParam("modelId") int modelId,
                                                   @RequestParam(value = "beforeExteriorColorId") int beforeExteriorColorId,
                                                   @RequestParam(value = "beforeInteriorColorId") int beforeInteriorColorId,
                                                   @RequestParam(value = "afterExteriorColorId") int afterExteriorColorId,
                                                   @RequestParam(value = "afterInteriorColorId") int afterInteriorColorId,
                                                   @RequestParam(value = "options") List<Integer> options) {
        Object result = specService.changeColor(modelId, beforeExteriorColorId, beforeInteriorColorId, afterExteriorColorId, afterInteriorColorId, options);
        return ResponseEntity.ok(Response.of(Code.SUCCESS, result));
    }
}
