package com.estimation.car.domain.entity;

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
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CATEGORY_ID", nullable = false)
    private CarCategory carCategory;

    @Column(length = 100, nullable = false)
    private String name;

    @Column(nullable = false)
    private int lowPrice;

    @Column(length = 100)
    private String imgPath;

    @Builder
    public Car(String name, int lowPrice) {
        this.name = name;
        this.lowPrice = lowPrice;
    }

    public void changeCategory(CarCategory category) {
        if (this.carCategory != null) {
            this.carCategory.getCars().remove(this);
        }
        this.carCategory = category;
        category.getCars().add(this);
    }
}
