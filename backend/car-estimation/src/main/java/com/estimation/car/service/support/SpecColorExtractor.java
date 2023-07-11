package com.estimation.car.service.support;

import com.estimation.car.entity.SpecColor;

import java.util.List;
import java.util.function.Function;
import java.util.function.Predicate;

public class SpecColorExtractor {
    List<SpecColor> specColors;

    public SpecColorExtractor(final List<SpecColor> specColors) {
        this.specColors = specColors;
    }

    public <T> List<T> extract(final Function<SpecColor, T> function) {
        return specColors.stream()
                         .map(function)
                         .distinct()
                         .toList();
    }

    public <T> List<T> extractFilteredBy(Predicate<SpecColor> predicate, final Function<SpecColor, T> function) {
        return specColors.stream()
                         .filter(predicate)
                         .map(function)
                         .distinct()
                         .toList();
    }
}
