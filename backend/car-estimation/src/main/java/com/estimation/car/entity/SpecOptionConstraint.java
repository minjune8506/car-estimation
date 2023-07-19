package com.estimation.car.entity;

import com.estimation.car.entity.id.SpecOptionConstraintId;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Objects;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@IdClass(SpecOptionConstraintId.class)
public class SpecOptionConstraint {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SOURCE_ID")
    private SpecOption source;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TARGET_ID")
    private SpecOption target;

    @Column(length = 10, nullable = false)
    private String action; // ADD, DELETE, ENABLE, DISABLE

    public boolean isSameAction(String action) {
        return Objects.equals(this.action, action);
    }
}
