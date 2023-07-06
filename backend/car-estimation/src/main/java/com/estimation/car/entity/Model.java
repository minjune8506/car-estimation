package com.estimation.car.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Model {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

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

    @Builder
    public Model(final Car car, final Engine engine, final DrivingType drivingType, final Mission mission, final String trimName, final String name, final String basicInfo, final int price, final String modelImg, final String modelDetailImg1, final String modelDetailImg2, final String modelDetailImg3) {
        this.car = car;
        this.engine = engine;
        this.drivingType = drivingType;
        this.mission = mission;
        this.trimName = trimName;
        this.name = name;
        this.basicInfo = basicInfo;
        this.price = price;
        this.modelImg = modelImg;
        this.modelDetailImg1 = modelDetailImg1;
        this.modelDetailImg2 = modelDetailImg2;
        this.modelDetailImg3 = modelDetailImg3;
    }
}
