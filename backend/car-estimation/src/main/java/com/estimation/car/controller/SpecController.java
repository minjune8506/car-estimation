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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/specs")
public class SpecController {

    private final SpecService specService;

    @GetMapping()
    public ResponseEntity<Response<List<SpecInfoResponse>>> findModelSpecs(@RequestParam final int modelId) {
        List<SpecInfoResponse> result = specService.findModelSpecs(modelId);
        return ResponseEntity.ok(Response.of(Code.SUCCESS, result));
    }

    @GetMapping("/{specCode}")
    public ResponseEntity<Response<SpecInfoResponse>> findSpec(@PathVariable final char specCode,
                                                               @RequestParam final int modelId) {
        SpecInfoResponse result = specService.findSpec(modelId, specCode);
        return ResponseEntity.ok(Response.of(Code.SUCCESS, result));
    }

    @GetMapping("/options/constraints")
    public ResponseEntity<Response<List<SpecOptionConstraintResponse>>> findOptionConstraints(@RequestParam final int modelId,
                                                                                              @RequestParam final List<Integer> selectedOptions) {
        List<SpecOptionConstraintResponse> result = specService.findOptionConstraints(modelId, selectedOptions);
        return ResponseEntity.ok(Response.of(Code.SUCCESS, result));
    }

    @GetMapping("/options/constraints/check")
    public ResponseEntity<Response<ConstraintCheckResponse>> checkOptionConstraints(@RequestParam final int modelId,
                                                                                    @RequestParam final List<Integer> selectedOptions,
                                                                                    @RequestParam final int targetOptionId) {
        ConstraintCheckResponse result = specService.checkOptionConstraints(modelId, selectedOptions, targetOptionId);
        return ResponseEntity.ok(Response.of(Code.SUCCESS, result));
    }

    @GetMapping("/colors/check")
    public ResponseEntity<Response<CheckSpecResponse>> checkColor(@RequestParam final int modelId,
                                                                  @RequestParam final char specCode,
                                                                  @RequestParam final int interiorColorId,
                                                                  @RequestParam final int exteriorColorId) {
        CheckSpecResponse result = specService.checkColor(modelId, specCode, exteriorColorId, interiorColorId);
        return ResponseEntity.ok(Response.of(Code.SUCCESS, result));
    }


    @GetMapping("/colors/change")
    public ResponseEntity<Response<?>> changeColor(@RequestParam final int modelId,
                                                   @RequestParam final int beforeExteriorColorId,
                                                   @RequestParam final int beforeInteriorColorId,
                                                   @RequestParam final int afterExteriorColorId,
                                                   @RequestParam final int afterInteriorColorId,
                                                   @RequestParam final List<Integer> options) {
        Object result = specService.changeColor(modelId, beforeExteriorColorId, beforeInteriorColorId, afterExteriorColorId, afterInteriorColorId, options);
        return ResponseEntity.ok(Response.of(Code.SUCCESS, result));
    }
}
