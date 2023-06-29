package com.estimation.car.domain.car.service;

import com.estimation.car.domain.entity.CarCategory;
import com.estimation.car.domain.car.dto.CategoryCarsResponseDto;
import com.estimation.car.domain.car.repository.CarCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class CarCategoryService {

    private final CarCategoryRepository carCategoryRepository;

    public List<CategoryCarsResponseDto> findAllCategoryWithCars() {
        List<CarCategory> categories = carCategoryRepository.findAllCategoryWithCar();
        return categories.stream()
                         .map(CategoryCarsResponseDto::toDto)
                         .toList();
    }
}