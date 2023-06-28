package com.estimation.car.domain.entity;

import com.estimation.car.domain.entity.id.ModelOptionDependencyId;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
@IdClass(ModelOptionDependencyId.class)
public class ModelOptionDependency {
    @Id
    @ManyToOne
    @JoinColumn(name = "CHOOSABLE_OPTION_ID")
    private ModelChoosableOption choosableOption;

    @Id
    @ManyToOne
    @JoinColumn(name = "OTHER_CHOOSABLE_OPTION_ID")
    private ModelChoosableOption otherChoosableOption;

    @Column(length = 10, nullable = false)
    private String type;
}
