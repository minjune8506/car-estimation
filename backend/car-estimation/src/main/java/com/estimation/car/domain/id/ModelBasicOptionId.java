package com.estimation.car.domain.id;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Objects;

@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
public class ModelBasicOptionId implements Serializable {
    private Integer model;
    private Integer option;
}
