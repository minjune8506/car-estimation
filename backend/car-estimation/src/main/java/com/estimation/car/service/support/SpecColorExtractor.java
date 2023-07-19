package com.estimation.car.service.support;

import com.estimation.car.entity.SpecColor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.function.Function;
import java.util.function.Predicate;


@Component
public class SpecColorExtractor {
    public <T> List<T> extract(final List<SpecColor> specColors,
                               final Function<SpecColor, T> function) {
        return specColors.stream()
                       .map(function)
                       .distinct()
                       .toList();
    }

    public <T> List<T> extractFilteredBy(final List<SpecColor> specColors,
                                         Predicate<SpecColor> predicate,
                                         final Function<SpecColor, T> function) {
        return specColors.stream()
                       .filter(predicate)
                       .map(function)
                       .distinct()
                       .toList();
    }
}
