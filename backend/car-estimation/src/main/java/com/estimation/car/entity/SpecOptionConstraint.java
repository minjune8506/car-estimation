package com.estimation.car.entity;

import com.estimation.car.entity.id.SpecOptionConstraintId;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
@IdClass(SpecOptionConstraintId.class)
public class SpecOptionConstraint {

    @Id
    @ManyToOne
    @JoinColumn(name = "SOURCE_ID")
    private SpecOption source;

    @Id
    @ManyToOne
    @JoinColumn(name = "TARGET_ID")
    private SpecOption target;

    @Column(length = 10, nullable = false)
    private String action; // ADD, DELETE, ENABLE, DISABLE

}
