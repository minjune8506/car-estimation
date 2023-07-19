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

import java.util.Comparator;
import java.util.List;
import java.util.function.Predicate;

@RequiredArgsConstructor
@Service
public class CarService {

    private final CarRepository carRepository;
    private final SpecColorRepository specColorRepository;

    public CarResponse findCar(int carId) {
        Car car = carRepository.findById(carId).orElseThrow(() -> new CarNotFoundException(ErrorCode.CAR_NOT_FOUND));
        return CarResponse.from(car);
    }

    public CarColorsResponse filterColor(int carId, int modelId) {
        List<SpecColor> colors = specColorRepository.findCarSpecColorsBy(carId);

        SpecColorExtractor extractor = new SpecColorExtractor(colors);
        List<ExteriorColor> exteriorColors = extractor.extract(SpecColor::getExteriorColor);
        List<InteriorColor> interiorColors = extractor.extract(SpecColor::getInteriorColor);

        Predicate<SpecColor> predicate = specColor -> specColor.getModelId() == modelId;
        List<ExteriorColor> modelExteriorColors = extractor.extractFilteredBy(predicate, SpecColor::getExteriorColor);
        List<InteriorColor> modelInteriorColors = extractor.extractFilteredBy(predicate, SpecColor::getInteriorColor);

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
