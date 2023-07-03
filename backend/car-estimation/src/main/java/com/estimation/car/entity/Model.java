package com.estimation.car.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.ToString;

@Entity
@Getter
@ToString
public class Model {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CAR_ID", nullable = false)
    private Car car;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ENGINE_ID", nullable = false)
    private Engine engine;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "DRIVING_TYPE_ID", nullable = false)
    private DrivingType drivingType;

    @ManyToOne(fetch = FetchType.LAZY)
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

    @Column(length = 100)
    private String modelImg;

    @Column(length = 100)
    private String modelDetailImg1;

    @Column(length = 100)
    private String modelDetailImg2;

    @Column(length = 100)
    private String modelDetailImg3;

}
