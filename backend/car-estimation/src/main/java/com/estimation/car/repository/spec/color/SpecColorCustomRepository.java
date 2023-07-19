package com.estimation.car.repository.spec.color;

import com.estimation.car.entity.SpecColor;

import java.util.List;

public interface SpecColorCustomRepository {

    List<SpecColor> findCarSpecColorsBy(int carId);

    List<SpecColor> findSpecColorsBy(int modelId, char specCode);

    List<SpecColor> findSpecColorsBy(int modelId, int exteriorColorId, int interiorColorId);

    List<SpecColor> findModelSpecColorsBy(int modelId);

    List<SpecColor> findExteriorColorsBy(int carId);

    List<SpecColor> findInteriorColorsBy(int carId);

    List<SpecColor> findSpecColorsToChangeBy(int modelId);
}
