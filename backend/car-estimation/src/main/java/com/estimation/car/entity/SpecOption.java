package com.estimation.car.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class SpecOption {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SPEC_ID")
    private Spec spec;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "OPTION_ID")
    private Option option;

    private int price;

    private char unityChoiceYn;

    private char showYn;

    private char defaultYn;

    public int getOptionCategoryId() {
        return option.getOptionCategory().getId();
    }

    public int getOptionId() {
        return option.getId();
    }

    public char getSpecCode() {
        return spec.getSpecCode();
    }
}
