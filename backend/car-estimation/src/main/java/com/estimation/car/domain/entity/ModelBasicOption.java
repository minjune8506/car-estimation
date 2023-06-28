package com.estimation.car.domain.entity;

import com.estimation.car.domain.entity.id.ModelBasicOptionId;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;

@Getter
@Entity
@IdClass(ModelBasicOptionId.class)
public class ModelBasicOption {

    @Id
    @ManyToOne
    @JoinColumn(name = "MODEL_ID")
    private Model model;

    @Id
    @ManyToOne
    @JoinColumn(name = "OPTION_ID")
    private Option option;

    @Column(length = 500)
    private String description;
}
