package com.estimation.car.controller;

import com.estimation.car.common.code.Code;
import com.estimation.car.common.response.Response;
import com.estimation.car.dto.response.car.CarColorResponse;
import com.estimation.car.dto.response.car.CarResponseDto;
import com.estimation.car.service.CarService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/cars")
public class CarController {

    private final CarService carService;

    @GetMapping("/{carId}")
    public ResponseEntity<Response<CarResponseDto>> findCar(@PathVariable("carId") int carId) {
        CarResponseDto result = carService.findCar(carId);
        return ResponseEntity.ok(Response.of(Code.SUCCESS, result));
    }

    @GetMapping("{carId}/colors")
    public ResponseEntity<Response<CarColorResponse>> filterColor(@PathVariable("carId") final int carId,
                                                                  @RequestParam("modelId") final int modelId) {
        CarColorResponse result = carService.filterColor(carId, modelId);
        return ResponseEntity.ok(Response.of(Code.SUCCESS, result));
    }
}
