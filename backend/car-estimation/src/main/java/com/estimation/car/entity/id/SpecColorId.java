package com.estimation.car.entity.id;


import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
public class SpecColorId implements Serializable {
    private int spec;
    private int exteriorColor;
    private int interiorColor;
}
