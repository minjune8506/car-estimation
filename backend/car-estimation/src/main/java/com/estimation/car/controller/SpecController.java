package com.estimation.car.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/specs")
public class SpecController {

    @GetMapping("colors")
    public void filterColor(@RequestParam("modelId") int modelId,
                             @RequestParam("specCode") char specCode) {
        // TODO: 스펙에 해당하는 외장 / 내장 색상 반환
    }

    @GetMapping("/check")
    public void checkSpec(@RequestParam("modelId") int modelId,
                           @RequestParam("interiorColorId") int interiorColorId,
                           @RequestParam("exteriorColorId") int exteriorColorId) {
        // TODO: modelId, interiorColorId, exteriorColorId를 이용하여 해당하는 스펙 반환
    }

}
