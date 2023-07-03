package com.estimation.car.entity.id;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
public class ModelColorBasicOptionId implements Serializable {
    private Integer modelColorComb;

    private Integer option;
}
