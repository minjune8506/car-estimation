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
    private String imgPath;

    @Column(length = 100)
    private String detailImgPath1;

    @Column(length = 100)
    private String detailImgPath2;

    @Column(length = 100)
    private String detailImgPath3;

    @Builder
    public Model(final Car car, final Engine engine, final DrivingType drivingType, final Mission mission, final String trimName, final String name, final String basicInfo, final int price, final String imgPath, final String detailImgPath1, final String detailImgPath2, final String detailImgPath3) {
        this.car = car;
        this.engine = engine;
        this.drivingType = drivingType;
        this.mission = mission;
        this.trimName = trimName;
        this.name = name;
        this.basicInfo = basicInfo;
        this.price = price;
        this.imgPath = imgPath;
        this.detailImgPath1 = detailImgPath1;
        this.detailImgPath2 = detailImgPath2;
        this.detailImgPath3 = detailImgPath3;
    }
}
