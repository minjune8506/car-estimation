package com.estimation.car.service;

import com.estimation.car.dto.response.car.category.CategoryCarsResponse;
import com.estimation.car.repository.car.category.CarCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class CarCategoryService {

    private final CarCategoryRepository carCategoryRepository;

    public List<CategoryCarsResponse> findAllCategoryWithCars() {
        return carCategoryRepository.findAllCategoryWithCar()
                       .stream()
                       .map(CategoryCarsResponse::from)
                       .toList();
    }
}
