package com.estimation.car.domain.entity.id;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
public class ModelOptionDependencyId implements Serializable {
    private Integer choosableOption;

    private Integer otherChoosableOption;
}
