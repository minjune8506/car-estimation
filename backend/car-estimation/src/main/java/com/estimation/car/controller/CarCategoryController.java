package com.estimation.car.controller;

import com.estimation.car.common.code.Code;
import com.estimation.car.common.response.Response;
import com.estimation.car.dto.response.car.category.CategoryCarsResponse;
import com.estimation.car.service.CarCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/car/categories")
public class CarCategoryController {

    private final CarCategoryService carCategoryService;

    @GetMapping("/cars")
    public ResponseEntity<Response<List<CategoryCarsResponse>>> categoryCars() {
        List<CategoryCarsResponse> responses = carCategoryService.findAllCategoryWithCars();
        return ResponseEntity.ok(Response.of(Code.SUCCESS, responses));
    }
}
