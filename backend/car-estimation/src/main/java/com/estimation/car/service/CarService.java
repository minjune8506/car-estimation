package com.estimation.car.service;

import com.estimation.car.common.code.ErrorCode;
import com.estimation.car.common.exception.CarNotFoundException;
import com.estimation.car.dto.response.car.CarColorResponse;
import com.estimation.car.dto.response.car.CarResponseDto;
import com.estimation.car.dto.response.exteriorcolor.ExteriorColorResponse;
import com.estimation.car.dto.response.interiorcolor.InteriorColorResponse;
import com.estimation.car.entity.Car;
import com.estimation.car.entity.ExteriorColor;
import com.estimation.car.entity.InteriorColor;
import com.estimation.car.entity.SpecColor;
import com.estimation.car.repository.car.CarRepository;
import com.estimation.car.repository.spec.color.SpecColorRepository;
import com.estimation.car.service.support.SpecColorExtractor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.function.Predicate;

@RequiredArgsConstructor
@Service
public class CarService {

    private final CarRepository carRepository;
    private final SpecColorRepository specColorRepository;

    public CarResponseDto findCar(int carId) {
        Car car = carRepository.findById(carId).orElseThrow(() -> new CarNotFoundException(ErrorCode.CAR_NOT_FOUND));
        return CarResponseDto.from(car);
    }

    public CarColorResponse filterColor(int carId, int modelId) {
        List<SpecColor> colors = specColorRepository.findCarSpecColorsBy(carId);

        SpecColorExtractor extractor = new SpecColorExtractor(colors);
        List<ExteriorColor> exteriorColors = extractor.extract(SpecColor::getExteriorColor);
        List<InteriorColor> interiorColors = extractor.extract(SpecColor::getInteriorColor);

        Predicate<SpecColor> predicate = specColor -> specColor.getModelId() == modelId;
        List<ExteriorColor> modelExteriorColors = extractor.extractFilteredBy(predicate, SpecColor::getExteriorColor);
        List<InteriorColor> modelInteriorColors = extractor.extractFilteredBy(predicate, SpecColor::getInteriorColor);

        List<ExteriorColorResponse> exteriorColorResponses = exteriorColors.stream()
                                                                           .map(exteriorColor -> ExteriorColorResponse.from(exteriorColor, modelExteriorColors.contains(exteriorColor)))
                                                                           .toList();
        List<InteriorColorResponse> interiorColorResponses = interiorColors.stream()
                                                                           .map(interiorColor -> InteriorColorResponse.from(interiorColor, modelInteriorColors.contains(interiorColor)))
                                                                           .toList();
        return CarColorResponse.from(exteriorColorResponses, interiorColorResponses);
    }
}

//        Set<ExteriorColor> carExteriorColorSet = new HashSet<>();
//        Set<InteriorColor> carInteriorColorSet = new HashSet<>();
//        Set<ExteriorColor> modelExteriorColorSet = new HashSet<>();
//        Set<InteriorColor> modelInteriorColorSet = new HashSet<>();
//
//        for (SpecColor color : colors) {
//            ExteriorColor exteriorColor = color.getExteriorColor();
//            InteriorColor interiorColor = color.getInteriorColor();
//
//            carExteriorColorSet.add(exteriorColor);
//            carInteriorColorSet.add(interiorColor);
//
//            if (color.getModelId() == modelId) {
//                modelExteriorColorSet.add(exteriorColor);
//                modelInteriorColorSet.add(interiorColor);
//            }
//        }

//        List<ExteriorColorResponse> exteriorColorResponses = new ArrayList<>();
//        List<InteriorColorResponse> interiorColorResponses = new ArrayList<>();
//
//        for (ExteriorColor exteriorColor : carExteriorColorSet) {
//            exteriorColorResponses.add(ExteriorColorResponse.from(exteriorColor, modelExteriorColorSet.contains(exteriorColor)));
//        }
//        for (InteriorColor interiorColor : carInteriorColorSet) {
//            interiorColorResponses.add(InteriorColorResponse.from(interiorColor, modelInteriorColorSet.contains(interiorColor)));
//        }
//
