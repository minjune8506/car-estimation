package com.estimation.car.domain;

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
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "CATEGORY_ID", nullable = false)
    private CarCategory carCategory;

    @Column(length = 100, nullable = false)
    private String name;

    @Column(nullable = false)
    private int lowPrice;

    @Column(length = 100)
    private String imgPath;
}
