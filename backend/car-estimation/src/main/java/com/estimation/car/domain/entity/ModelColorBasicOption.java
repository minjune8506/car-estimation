package com.estimation.car.domain.entity;

import com.estimation.car.domain.entity.id.ModelColorBasicOptionId;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
@IdClass(ModelColorBasicOptionId.class)
public class ModelColorBasicOption {
    @Id
    @ManyToOne
    @JoinColumn(name = "MODEL_COLOR_COMB_ID")
    private ModelColorComb modelColorComb;

    @Id
    @ManyToOne
    @JoinColumn(name = "OPTION_ID")
    private Option option;
}
