package com.estimation.car.domain.car.controller;

import com.estimation.car.common.code.Code;
import com.estimation.car.common.response.Response;
import com.estimation.car.domain.car.dto.CategoryCarsResponseDto;
import com.estimation.car.domain.car.service.CarCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1/car")
@RequiredArgsConstructor
public class CarCategoryController {

    private final CarCategoryService menuService;

    // GET api/v1/car/category/cars
    // 자동차 카테고리의 자동차들을 반환한다.
    @GetMapping("/category/cars")
    public ResponseEntity<Response<List<CategoryCarsResponseDto>>> categoryCars() {
        List<CategoryCarsResponseDto> responses = menuService.findAllCategoryWithCars();
        return ResponseEntity.ok()
                             .body(Response.of(Code.SUCCESS, responses));
    }
}
