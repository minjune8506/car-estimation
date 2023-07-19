package com.estimation.car.service;

import com.estimation.car.common.code.ErrorCode;
import com.estimation.car.common.exception.CarNotFoundException;
import com.estimation.car.dto.response.car.CarColorsResponse;
import com.estimation.car.dto.response.car.CarResponse;
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
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.function.Predicate;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class CarService {

    private final CarRepository carRepository;
    private final SpecColorRepository specColorRepository;
    private final SpecColorExtractor colorExtractor;

    public CarResponse findCar(final int carId) {
        Car car = carRepository.findById(carId)
                          .orElseThrow(CarNotFoundException::new);
        return CarResponse.from(car);
    }

    public CarColorsResponse filterColor(final int carId, final int modelId) {
        List<SpecColor> colors = specColorRepository.findCarSpecColorsBy(carId);

        List<ExteriorColor> exteriorColors = colorExtractor.extract(colors, SpecColor::getExteriorColor);
        List<InteriorColor> interiorColors = colorExtractor.extract(colors, SpecColor::getInteriorColor);

        Predicate<SpecColor> predicate = specColor -> specColor.getModelId() == modelId;
        List<ExteriorColor> modelExteriorColors = colorExtractor.extractFilteredBy(colors, predicate, SpecColor::getExteriorColor);
        List<InteriorColor> modelInteriorColors = colorExtractor.extractFilteredBy(colors, predicate, SpecColor::getInteriorColor);

        List<ExteriorColorResponse> exteriorColorResponses = exteriorColors.stream()
                                                                     .map(exteriorColor -> ExteriorColorResponse.from(exteriorColor, modelExteriorColors.contains(exteriorColor)))
                                                                     .sorted(Comparator.comparing(ExteriorColorResponse::isChoiceYn).reversed())
                                                                     .toList();
        List<InteriorColorResponse> interiorColorResponses = interiorColors.stream()
                                                                     .map(interiorColor -> InteriorColorResponse.from(interiorColor, modelInteriorColors.contains(interiorColor)))
                                                                     .sorted(Comparator.comparing(InteriorColorResponse::isChoiceYn).reversed())
                                                                     .toList();
        return CarColorsResponse.from(exteriorColorResponses, interiorColorResponses);
    }
}
