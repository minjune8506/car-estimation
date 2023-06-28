package com.estimation.car.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import org.hibernate.annotations.ColumnDefault;

@Getter
@Entity
public class ModelChoosableOption {
    @Id
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "MODEL_ID", nullable = false)
    private Model model;

    @ManyToOne
    @JoinColumn(name = "OPTION_ID", nullable = false)
    private Option option;

    @Column(nullable = false)
    @ColumnDefault("'Y'")
    private char unityChoiceYn;

    @Column(nullable = false)
    @ColumnDefault("'N'")
    private char exclusiveYn;
}
