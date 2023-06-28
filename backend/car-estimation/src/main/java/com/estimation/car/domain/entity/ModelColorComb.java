package com.estimation.car.domain.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class ModelColorComb {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "MODEL_ID", nullable = false)
    private Model model;

    @ManyToOne
    @JoinColumn(name = "INTR_COLOR_ID", nullable = false)
    private ExteriorColor extrColor;

    @ManyToOne
    @JoinColumn(name = "EXTR_COLOR_ID", nullable = false)
    private InteriorColor intrColor;
}
