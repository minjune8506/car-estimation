package com.estimation.car.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;

@Getter
@Entity
public class Model {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "CAR_ID", nullable = false)
    private Car car;

    @ManyToOne
    @JoinColumn(name = "ENGINE_ID", nullable = false)
    private Engine engine;

    @ManyToOne
    @JoinColumn(name = "DRIVING_TYPE_ID", nullable = false)
    private DrivingType drivingType;

    @ManyToOne
    @JoinColumn(name = "MISSION_ID", nullable = false)
    private Mission mission;

    @Column(length = 50, nullable = false)
    private String trimName;

    @Column(length = 100, nullable = false)
    private String name;

    @Column(length = 100)
    private String basicInfo;

    @Column(nullable = false)
    private int price;
}
