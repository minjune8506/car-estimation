package com.estimation.car.controller;

import com.estimation.car.common.code.Code;
import com.estimation.car.common.response.Response;
import com.estimation.car.dto.response.car.CarColorsResponse;
import com.estimation.car.dto.response.car.CarResponse;
import com.estimation.car.service.CarService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/cars")
public class CarController {

    private final CarService carService;

    @GetMapping("/{carId}")
    public ResponseEntity<Response<CarResponse>> findCar(@PathVariable int carId) {
        CarResponse result = carService.findCar(carId);
        return ResponseEntity.ok(Response.of(Code.SUCCESS, result));
    }

    @GetMapping("/{carId}/colors")
    public ResponseEntity<Response<CarColorsResponse>> filterColors(@PathVariable final int carId,
                                                                    @RequestParam final int modelId) {
        CarColorsResponse result = carService.filterColor(carId, modelId);
        return ResponseEntity.ok(Response.of(Code.SUCCESS, result));
    }
}
