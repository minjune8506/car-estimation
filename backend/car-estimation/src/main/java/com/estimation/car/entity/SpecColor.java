package com.estimation.car.entity;

import com.estimation.car.entity.id.SpecColorId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
@IdClass(SpecColorId.class)
public class SpecColor {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SPEC_ID")
    private Spec spec;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "EXTERIOR_COLOR_ID")
    private ExteriorColor exteriorColor;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "INTERIOR_COLOR_ID")
    private InteriorColor interiorColor;
}
