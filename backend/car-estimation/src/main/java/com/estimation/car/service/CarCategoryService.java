package com.estimation.car.service;

import com.estimation.car.dto.response.car.category.CategoryCarsResponse;
import com.estimation.car.entity.CarCategory;
import com.estimation.car.repository.car.category.CarCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class CarCategoryService {

    private final CarCategoryRepository carCategoryRepository;

    public List<CategoryCarsResponse> findAllCategoryWithCars() {
        List<CarCategory> categories = carCategoryRepository.findAllCategoryWithCar();
        return categories.stream()
                         .map(CategoryCarsResponse::from)
                         .toList();
    }
}
