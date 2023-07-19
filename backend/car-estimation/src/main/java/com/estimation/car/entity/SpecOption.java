package com.estimation.car.entity;

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

    @Builder
    public SpecOption(Spec spec, Option option, int price, char unityChoiceYn, char showYn, char defaultYn) {
        this.spec = spec;
        this.option = option;
        this.price = price;
        this.unityChoiceYn = unityChoiceYn;
        this.showYn = showYn;
        this.defaultYn = defaultYn;
    }

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
